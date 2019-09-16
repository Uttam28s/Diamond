import mongoose from 'mongoose'

export const dbConnect = () => {
    mongoose.connect('mongodb+srv://uttam:76986Utt@m@diamond-ppwns.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(()=> console.log('db connected'))
        .catch(e => console.log(e))
}
