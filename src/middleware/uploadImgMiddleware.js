import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // uuid modülünden v4 fonksiyonunu kullanarak UUID oluşturacağız
import {
  aws_key,
  aws_secret,
  aws_region,
  aws_bucket,
  aws_config,
} from '../config/env/index.js';

const s3 = new S3Client({
  region: aws_region,
  credentials: {
    accessKeyId: aws_key,
    secretAccessKey: aws_secret,
  },
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const uploadImgMiddleware = (fieldName) => async (req, res, next) => {
  upload.single(fieldName)(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }

    if (!req.file) {
      return next();
    }

    const file = req.file;

    // UUID oluşturup dosya adına ekleyelim
    const key = `${uuidv4()}_${file.originalname}`;

    const params = {
      Bucket: aws_bucket,
      Key: key, // Dosya adı olarak UUID kullanıyoruz
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      res.status(200).json({ message: 'Image successfully uploaded' });
      next();
    } catch (error) {
      res.status(500).send('Error uploading file to S3');
    }
  });
};

export { uploadImgMiddleware };
