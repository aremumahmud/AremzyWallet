const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const User = require("./models/User");
const createWalletSet = require("./services/createWalletSet");
const createWallets = require("./services/createWallets");
const FetchTokens = require("./services/getTokens");
const TransferCrypto = require("./services/transfer");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL_UI, credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Passport configuration
passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
        },
        async(accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            const wallet_set = await createWalletSet(
                profile.displayName.split(" ").join("__")
            );
            const wallets = await createWallets(wallet_set.data.walletSet.id);

            const newUser = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                wallet_set_name: wallet_set.data.walletSet.name,
                wallet_set_id: wallet_set.data.walletSet.id,
                wallets,
            });

            await newUser.save();
            done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URL_UI}/dashboard`);
    }
);

app.get("/api/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: "Logged out" });
    });
});

app.get("/api/current_user", (req, res) => {
    res.json(req.user);
});

app.get("/api/tokens/:wallet", async(req, res) => {
    let wallet_id = req.params.wallet;
    let tokens = await FetchTokens(wallet_id);
    res.send(tokens);
});

app.get("/api/transfer", async(req, res) => {
    if (!req.user)
        return res.send({ error: true, message: "Invalid transaction1" });

    let amount = parseInt(req.query.amount || 0);
    if (amount == 0)
        return res.send({ error: true, message: "Invalid transaction2" });

    let dest = req.query.destination;
    if (!dest) return res.send({ error: true, message: "Invalid transaction3" });

    let wallet_id = req.query.wallet;

    let tokens = await FetchTokens(wallet_id);

    if (tokens.length === 0)
        return res.send({ error: true, message: "Invalid transaction4" });

    let usdc_token = tokens[1];

    if (amount <= usdc_token.amount) {
        let token_id = tokens[1].token.id;
        let transaction = await TransferCrypto(amount, token_id, wallet_id, dest);
        return res.send(transaction);
    }

    res.send({ error: true, message: "Invalid transaction5" });
});

// createWalletSet('mywalee').then(re => {
//     console.log(re)
// }).catch(err => console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});