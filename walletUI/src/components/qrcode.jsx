// QRCodeGenerator.js
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ address }) => {
  return (
    <div>
      <QRCode value={address} />
    </div>
  );
};

export default QRCodeGenerator;
