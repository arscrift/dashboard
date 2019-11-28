appEventos.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/', {
		controller: 'NavegacaoController'
	})
	.when('/categoria', {
		templateUrl: 'templates/categoria.html',
		controller: 'CategoriaController'
	})
	.when('/evento', {
		templateUrl: 'templates/evento.html',
		controller: 'EventoController'
	})
    .when('/ver-evento/:idEvento', {
		templateUrl: 'templates/ver-evento.html'
	})
	.when('/presenca', {
		templateUrl: 'templates/presenca.html',
		controller: 'PresencaController'
	})
	.when('/acesso', {
		templateUrl: 'templates/acesso.html',
		controller: 'NavegacaoController'
	})
	.when('/administracao', {
		templateUrl: 'templates/administracao.html',
		controller: 'AdministradorController'
	}).otherwise({ redirectTo: '/' });
	
	$httpProvider.interceptors.push('tokenInterceptor');
});
