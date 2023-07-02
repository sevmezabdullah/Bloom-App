import mongoose from 'mongoose';
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb+srv://abdullah:324106@cluster2.nxmtjts.mongodb.net/?retryWrites=true&w=majority'
    );

    if (connection) {
      console.log('Connection Established');
    }
  } catch (error) {
    console.log('Error in connectionToDatabase', error);
    throw error;
  }
};

export default connectToDatabase;
