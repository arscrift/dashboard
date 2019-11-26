appEventos.controller('EventoController', function($rootScope, $scope, $http, $location, $timeout) {
    $rootScope.activetab = $location.path();
	$scope.form = {};
	$scope.alerta = {abrir: false}
	
	function handleFileSelect(evt) {
		let f = evt.target.files[0];
		let reader = new FileReader();
		
		reader.onload = (function(theFile) {
			return function(e) {
				let binaryData = e.target.result;
				let base64String = window.btoa(binaryData);
				
				$scope.form.imagemPrincipal = base64String;
				console.log($scope.form);
			};
		})(f);
		
		reader.readAsBinaryString(f);
	}
	document.getElementById('imagem-principal').addEventListener('change', handleFileSelect, false);
	
	$scope.operacao = {
		alterar: false,
		btn: 'Cadastrar'
	}
	
	$http.get('./restrito/evento/listar')
	.then((resposta)=>{
		if(resposta.data.status == 500){
			$scope.alerta.mensagem = resposta.data.message;
			$scope.alerta.abrir = true;
			$timeout(function(){
				$scope.alerta.abrir = false;
			}, 2500);
		}else{
			$scope.eventos = resposta.data;
		}
	}, (resposta)=>{
		console.log(resposta.data);
		$scope.alerta.mensagem = resposta.data.message;
		$scope.alerta.abrir = true;
		$timeout(function(){
			$scope.alerta.abrir = false;
		}, 2500);
	});
	
	$http.get('./restrito/categoria/listar')
	.then((resposta)=>{
		if(resposta.data.status == 500){
			$scope.alerta.mensagem = resposta.data.message;
			$scope.alerta.abrir = true;
			$timeout(function(){
				$scope.alerta.abrir = false;
			}, 2500);
		}else{
			$scope.categorias = resposta.data;
		}
	}, (resposta)=>{
		console.log(resposta.data);
		$scope.alerta.mensagem = resposta.data.message;
		$scope.alerta.abrir = true;
		$timeout(function(){
			$scope.alerta.abrir = false;
		}, 2500);
	});
	
	$scope.salvar = (form)=>{
		console.log(form)
		
		if($scope.operacao.alterar){
			$http.put('./restrito/evento/alterar', form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.eventos[form] = resposta.data;
				}
				console.log(resposta.data);
			}, (resposta)=>{
				console.log(resposta.data);
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			});
		}else{
			let idAdministrador = $rootScope.navegacao.perfil.idAdministrador;
			
			$http.post(`./restrito/evento/inserir/${idAdministrador}`, form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.eventos.push(resposta.data);
				}
				console.log(resposta.data);
			}, (resposta)=>{
				console.log(resposta.data);
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			});
		}
		
		$scope.form = {};
		$scope.operacao = {
			alterar: false,
			btn: 'Cadastrar'
		}
	}
	
	$scope.consultar = (evento)=>{
		$scope.form = evento;
		$scope.operacao = {
			alterar: true,
			btn: 'Editar'
		}
	}
	
	$scope.excluir = (evento)=>{
		$http.delete(`./restrito/evento/deletar/${evento.idEvento}`)
		.then((resposta)=>{
			if(resposta.data.status == 500){
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			}else{
				$scope.eventos.splice($scope.eventos.indexOf(evento), 1);
			}
			console.log(resposta.data);
		}, (resposta)=>{
			console.log(resposta.data);
			$scope.alerta.mensagem = resposta.data.message;
			$scope.alerta.abrir = true;
			$timeout(function(){
				$scope.alerta.abrir = false;
			}, 2500);
		});
	}
	
	$scope.resetForm = ()=>{
		$scope.form = {};
		$scope.operacao = {
			alterar: false,
			btn: 'Cadastrar'
		}
	}
});