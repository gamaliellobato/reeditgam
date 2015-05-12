console.log ("#Gama: Cargo app.js");
//inyectando el modulo de ui router
//como parametro del arreglo de objetos
//del modulo
var modulo1=
	angular.module("reeditgam",['ui.router']);

	//configurando las rutas
	//recibe un arreglo de elementos
	modulo1.config(
		['$stateProvider',
		'$urlRouterProvider',
		function($stateProvider,$urlRouterProvider){
			//iniciando rutina de configuracion
			$stateProvider.state('home',{
				//definiendo estado como un objeto
				url: "/home", // url que define el estado 
				templateUrl: "/home.html", //plantilla base para el estado
				controller: "mainCtrl" //
			});
			//Url por defecto
			$urlRouterProvider.otherwise('home');
		}]);

	//creando un servicio del tipo factory
modulo1.factory('posts',[function(){
	//cuerpo delf actory llamdo post
	var o = {
		posts : [
			{
				title: "post 1", upvotes: 15,
				comments: [
					{author: "Karina", body: "Esto esta de pelos.",
					upvotes:3},
					{author: "Gamaliel", body: "Esto es basura.",
					upvotes:0}]
			},
			{
				title: "post 2", upvotes: 15,
				comments: [
					{author: "Coco", body: "Esto es asombroso.",
					upvotes:5},
					{author: "Cristian", body: "Esto esta aburrido.",
					upvotes:1}]
			}
		]
	};
	//retornando objeto de datos persistentes
	return o;
}]);

	//creando controlador
	//dependecy injections
modulo1.controller("mainCtrl",[
	'$scope','posts',//inyectando factory post
	function($scope, posts){
		$scope.test = "Hola Angular";
		//Modelo al cual se le asigna
		//el resultado del factory
		$scope.posts = posts.posts;

		//Metodo del controlador
		$scope.addPost = function (){
			if(!$scope.title || $scope.title === "")
			{
				alert("No se permite postear titulos vacios");
				return;
			}
			$scope.posts.push(
				{
					title: $scope.title,
					link: $scope.link,
					upvotes:0
				});
			//Two-way data binding
			$scope.title = "";
			$scope.link = "";
		};
		//Metodo que incrementa el voto
		//de un post en una unidad
		$scope.incrementUpvotes = function (post)
		{
			post.upvotes += 1;
		};
	}]);