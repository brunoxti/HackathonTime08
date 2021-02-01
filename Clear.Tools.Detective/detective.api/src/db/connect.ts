import mongoose from 'mongoose';

export default class DB {
  public static connect() {

    return mongoose
      .connect(
        `mongodb://${process.env.MONGO_URI}:${process.env.MONGO_PORT}/detective`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
  }
}
