appEventos.controller('PatrocinadorController', function($rootScope, $scope, $http, $location, $routeParams, $timeout) {
	let idEvento = $routeParams.idEvento;
	
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
				
				$scope.form.imagem = base64String;
				console.log($scope.form);
			};
		})(f);
		
		reader.readAsBinaryString(f);
	}
	document.getElementById('imagem-patrocinador').addEventListener('change', handleFileSelect, false);
	
	$scope.operacao = {
		alterar: false,
		btn: 'Cadastrar'
	}
	
	$http.get(`./restrito/patrocinador/listar/${idEvento}`)
	.then((resposta)=>{
		if(resposta.data.status == 500){
			$scope.alerta.mensagem = resposta.data.message;
			$scope.alerta.abrir = true;
			$timeout(function(){
				$scope.alerta.abrir = false;
			}, 2500);
		}else{
			$scope.patrocinadores = resposta.data;
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
		if($scope.operacao.alterar){
			$http.put('./restrito/patrocinador/alterar', form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.patrocinadores[form] = resposta.data;
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
			$http.post(`./restrito/patrocinador/inserir/${idEvento}`, form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.patrocinadores.push(resposta.data);
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
	
	$scope.consultar = (patrocinador)=>{
		$scope.form = patrocinador;
		$scope.operacao = {
			alterar: true,
			btn: 'Editar'
		}
	}
	
	$scope.excluir = (patrocinador)=>{
		$http.delete(`./restrito/patrocinador/deletar/${patrocinador.idPatrocinador}`)
		.then((resposta)=>{
			if(resposta.data.status == 500){
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			}else{
				$scope.patrocinadores.splice($scope.patrocinadores.indexOf(patrocinador), 1);
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