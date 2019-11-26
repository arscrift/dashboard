appEventos.controller('CategoriaController', function($rootScope, $scope, $http, $location, $timeout) {
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
				
				$scope.form.icone = base64String;
				console.log($scope.form);
			};
		})(f);
		
		reader.readAsBinaryString(f);
	}
	document.getElementById('icone').addEventListener('change', handleFileSelect, false);
	
	$scope.operacao = {
		alterar: false,
		btn: 'Cadastrar'
	}
	
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
		let perfil = JSON.parse(localStorage.getItem('perfil'));
		form.idAdministrador = perfil.idAdministrador;
		
		if($scope.operacao.alterar){
			$http.put(`./restrito/categoria/alterar`, form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.categorias[form] = resposta.data;
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
			$http.post(`./restrito/categoria/inserir`, form)
			.then((resposta)=>{
				if(resposta.data.status == 500){
					$scope.alerta.mensagem = resposta.data.message;
					$scope.alerta.abrir = true;
					$timeout(function(){
						$scope.alerta.abrir = false;
					}, 2500);
				}else{
					$scope.categorias.push(resposta.data);
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
	
	$scope.consultar = (categoria)=>{
		$scope.form = categoria;
		$scope.operacao = {
			alterar: true,
			btn: 'Editar'
		}
	}
	
	$scope.excluir = (categoria)=>{
		$http.delete(`./restrito/categoria/deletar/${categoria.idCategoria}`)
		.then((resposta)=>{
			if(resposta.data.status == 500){
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			}else{
				$scope.categorias.splice($scope.categorias.indexOf(categoria), 1);
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