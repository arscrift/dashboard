appEventos.factory('tokenInterceptor', function($location, $rootScope, Cookie){
	return {
		'request': function(config){
			
			//$rootScope.navegacao.temAcesso = true;
			config.headers['Authorization'] = `Bearer ${Cookie.get('token')}`
			
			return config;
		},
		'responseError': function(rejection){
			
			if(rejection.status==401){
				$rootScope.navegacao.temAcesso = false;
				$location.path('/acesso');
			}
			
			return rejection;
			//return $q.reject(rejection);
		}
	}
})