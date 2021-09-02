const sharp = require('sharp');

const file = 'img/sample.jpg';
const image = sharp(file);

const originalSize = {
  //unit [inch]
  width: 23 * 10 * 0.0393701,
  height: 23 * 10 * 0.0393701
};


const resizeImage = (file, w, h) => {
  return sharp(file)
    .resize({
      width: Math.floor(w),
      height: Math.floor(h),
      fit: 'inside'
    })
}


image
  .metadata()
  .then( (metadata) => {
    
    //resize (needed: 原本の大きさ or DPI)
    const w = metadata.width;
    const h = metadata.height;
    
    const wDens = w / originalSize.width;
    const hDens = h / originalSize.height;
    console.log(w, h, wDens, hDens);

    const ratio = wDens;
    
    //rotate (needed: 本来の向き)
    const rotateDeg = 0;
    
    
    //output
    resizeImage(file, 150, 150).rotate(rotateDeg).jpeg({mozjpeg:true}).toFile('thum.jpg');
    resizeImage(file, w*100/ratio, h*100/ratio).rotate(rotateDeg).jpeg({mozjpeg:true}).toFile('100.jpg');
    resizeImage(file, w*400/ratio, h*400/ratio).rotate(rotateDeg).jpeg({mozjpeg:true}).toFile('400.jpg');
    resizeImage(file, w*1000/ratio, h*1000/ratio).rotate(rotateDeg).jpeg({mozjpeg:true}).toFile('1000.jpg');

  })
  .catch( (err) => {
    console.log(err);
  });

