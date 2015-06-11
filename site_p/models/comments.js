//importar mongoose
var mongoose = 
	require('mongoose');

//crear esquema
var commentSchema = 
	new mongoose.Schema({
		body: String,
		author: String,
		upvotes: {type: Number, default: 0},
		post: {type: mongoose.Schema.Types.ObjectId, 
			ref: 'post'}
});

	commentSchema.methods.upvote = function(cb){
		this.upvotes += 1;
		this.save(cb);
	};

//creo el modelo
mongoose.model('comment',commentSchema);