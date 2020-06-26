const Express = require("express");
var cors = require('cors')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://mateus:mateus123@mycluster-mu5id.gcp.mongodb.net/MyDATABASE?retryWrites=true&w=majority";
const DATABASE_NAME = "MyDATABASE";

var app = Express();

app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const multer = require('multer');

const upload = multer({ dest: '../uploads' });

app.use(Express.static('./'));

app.post("/nova-imagem", upload.single('file'), (req, res) => {

    if (req.file) {
        // Vamos imprimir na tela o objeto com os dados do arquivo armazenado
        return res.send(req.file);
    }

    // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
    return res.send('Houve erro no upload!');

});

var database;

app.listen(4444, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        productCollection = database.collection("Product");
        sellerCollection = database.collection("Seller");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/Products", (request, response) => {
    productCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
        console.log("SERVIDOR");
        console.log(result);
    });
});

app.get("/Products/:id", (request, response) => {
    productCollection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/Sellers", (request, response) => {
    sellerCollection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/Product", (request, response) => {
    productCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.post("/Seller", (request, response) => {
    sellerCollection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});