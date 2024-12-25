const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const groupeRoutes = require('./routes/groupeRoutes');
const diplomeRoutes = require('./routes/diplome');
const emailUser =require('./routes/emailuser');
const calandrier=require('./routes/calandrier');
const emailcall =require('./routes/emailcall');
const plan=require('./routes/plan');
const element=require('./routes/element');
const unite=require('./routes/unite');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groupes', groupeRoutes);
app.use('/api/diplome',diplomeRoutes);
app.use('/api/emailuser',emailUser);
app.use('/api/calandrier',calandrier);
app.use('/api/emailcall',emailcall);
app.use('/api/plan',plan);
app.use('/api/unite',unite);
app.use('/api/element',element);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
