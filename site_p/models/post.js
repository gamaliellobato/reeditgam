 //importando framework mongoose
 var mongoose = require('mongoose');

 //creando el esquema 
 //un esquema es un modelo
 //de algo
 var postSchema = 
 	new mongoose.Schema({
 		title: String,
 		link: String,
 		upvotes: {type: Number, default: 0},
 		comments: [{type: mongoose.Schema.Types.ObjectId, ref:'comment'}]


 });

 	postSchema.methods.upvote = function(cb){
 		this.upvotes += 1;
 		this.save(cb);
 	};

 //cargando el esquema en la base de datos
 //o creanod el modelo en la bse de datos
 mongoose.model('post',postSchema);