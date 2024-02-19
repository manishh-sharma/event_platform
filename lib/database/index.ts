import mongoose from 'mongoose';

 
const MONGODB_URI = process.env.MONGODB_URI;

//create variable to hold cache for our connection
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
//    if cache connection exists, return the connection
    if (cached.conn) return cached.conn;

    //  if no mongodb url found
  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  // retrive the cache connection or create a new connection using the provided URI and store it in the cache
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}

//cache connection is used to avoid making multiple connections every time it is refreshed. hence it will retireve the connection only once if it exsists. thus preventing it from forming multiple conneciton