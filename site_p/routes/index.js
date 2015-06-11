var express = require('express');
var router = express.Router();

// Importando lo necesario
// para trabajar con la
// base de datos
var mongoose = require('mongoose');
var post = mongoose.model('post');//error estaba posts
var comment = mongoose.model('comment');

// Creando la primera ruta
// de nuestro web service
// Ruta creada: http://localhost:3000/posts
// Ruta que obtiene todos los posts
// guardados en la base de datos
router.get('/posts',function(req, res, next ){
  post.find(function(err, posts){
    // Si courre un error en la base de datos
    // paso el error a la siguient funcion
    if(err){
      return next(err);
    }
    // Si no ocurre error
    
    //
    res.json(posts);
    
  });
});

// Ruta que crea un post en la base de datos
// Ruta creada: 
// http://localhost:3000/post?title=itgam&link=www.itgam.com
router.post('/post',function(req, res, next){
  // Creo un nuevo post del cuerpo
  // de la peticion
  var newPost = new post(req.body);
  // Salvando ese nuevo posts
  // en la base de datos
  newPost.save(function(err, newPost){
    if(err)
    {
      return next(err);
    }
    res.json(newPost);
  });
});


//ruta para crear post en funcion
//de su id
router.param('post', function(req, res, next, id){
var query = post.findById(id);
  query.exec(function(error, post){
    if (error){
      return next(error);
    }
    req.post = post;
    return next();
  });
});

router.param('comment', function(req, res, next, id){
  var query = comment.findById(id);
    query.exec(function(err, dbcomment){
      if(err){
        return next(err);
      }
      if(!dbcomment){
        return next(new Error("No se encontro comentario"));
      }
      console.log("grabara comentario");
      req.comment = dbcomment;
      return next();
    });
});

//ruta que carga un post
router.get('/posts/:post', function (req, res){
  res.json(req.post);
});

//ruta que suma votos a un post
router.put('/posts/:post/upvote', function(req, res, next){
  req.post.upvote(function(err, post){
    if(err){
      console.log("ocurrio un error");
      return next(err);
    }
    res.json(post);
  });
});

//crear comentarios
router.post('/posts/:post/createcomment',function(req, res, next){
  var new_comment = new comment(req.body);
  new_comment.post = req.post;
  //salvando el comentario
  new_comment.save(function(err, new_comment){
    if(err){
      return next(err);
    }
    //agregando comentario
    req.post.comments.push(new_comment);
    //salvando post
    req.post.save(function(err, post){
      if(err){
        return next(err);
      }
      res.json(new_comment);
    });
  });
});

//ruta que consulta un comentario
router.get('/comments/:comment',function(req, res, next){
  req.json(req.comment);
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Lobato' });
});

module.exports = router;
