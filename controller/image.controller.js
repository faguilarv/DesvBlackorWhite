import nodemailer from "nodemailer";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import path from "path";

const __dirname = import.meta.dirname;

const saveImage = async (req, res) => {
  try {
    const url = req.body.url;

    //aqui devuelvo la imagen y almaceno en buffer
    const image = await Jimp.read(url);
    const buffer = await image
      .resize(500, 500)
      .quality(60)
      .greyscale()
      .getBufferAsync("image/jpeg");

    const pathFile = path.join(__dirname, `../public/images/${nanoid()}.jpeg`);
    await image.writeAsync(pathFile);

    res.render("success", { success: true });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getInicio = (req, res) => {
  res.render("inicio");
};

const sendEmail = async (req, res) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transport.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Testing con Nodemailer ✔", // Subject line

      html: "<b>Testiando correo con Nodemaile en mailtrap</b>", // html body
    });

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

export const imageController = {
  saveImage,
  getInicio,
  sendEmail,
};
