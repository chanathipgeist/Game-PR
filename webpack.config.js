const path = require('path');

module.exports = {
  entry: './game.js',  // แก้ไขตามโครงสร้างโปรเจ็คของคุณ
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
