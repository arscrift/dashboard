appEventos.controller('AdministradorController', function($rootScope, $scope, $http, $location, $timeout) {
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
				
				$scope.form.foto = base64String;
				console.log($scope.form);
			};
		})(f);
		
		reader.readAsBinaryString(f);
	}
	document.getElementById('foto').addEventListener('change', handleFileSelect, false);
	
	$scope.operacao = {
		alterar: false,
		btn: 'Cadastrar'
	}
	
	$http.get('https://api.arscrift.digital/restrito/administrador/listar')
	.then((resposta)=>{
		if(resposta.data.status == 500){
			$scope.alerta.mensagem = resposta.data.message;
			$scope.alerta.abrir = true;
			$timeout(function(){
				$scope.alerta.abrir = false;
			}, 2500);
		}else{
			$scope.administradores = resposta.data;
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
        if(form.senha !== form.senha2){
            $scope.alerta.mensagem = 'As senhas não correspondem';
            $scope.alerta.abrir = true;
            $timeout(function(){
                $scope.alerta.abrir = false;
            }, 2500);
        }else{
            if($scope.operacao.alterar){
                $http.put(`https://api.arscrift.digital/restrito/administrador/alterar`, form)
                .then((resposta)=>{
                    if(resposta.data.status == 500){
                        $scope.alerta.mensagem = resposta.data.message;
                        $scope.alerta.abrir = true;
                        $timeout(function(){
                            $scope.alerta.abrir = false;
                        }, 2500);
                    }else{
                        $scope.administradores[form] = resposta.data;
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
                $http.post(`https://api.arscrift.digital/restrito/administrador/inserir`, form)
                .then((resposta)=>{
                    if(resposta.data.status == 500){
                        $scope.alerta.mensagem = resposta.data.message;
                        $scope.alerta.abrir = true;
                        $timeout(function(){
                            $scope.alerta.abrir = false;
                        }, 2500);
                    }else{
                        $scope.administradores.push(resposta.data);
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
        }
		
		$scope.form = {};
		$scope.operacao = {
			alterar: false,
			btn: 'Cadastrar'
		}
	}
	
	$scope.consultar = (administrador)=>{
		$scope.form = administrador;
		$scope.operacao = {
			alterar: true,
			btn: 'Editar'
		}
	}
	
	$scope.excluir = (administrador)=>{
		$http.delete(`https://api.arscrift.digital/restrito/administrador/deletar/${administrador.idAdministrador}`)
		.then((resposta)=>{
			if(resposta.data.status == 500){
				$scope.alerta.mensagem = resposta.data.message;
				$scope.alerta.abrir = true;
				$timeout(function(){
					$scope.alerta.abrir = false;
				}, 2500);
			}else{
				$scope.administradores.splice($scope.administradores.indexOf(administrador), 1);
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