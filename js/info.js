			function lista(data) {
	 				data.results.forEach(function(item){
	 					var add_resultados_tabela = "<tr><td><a href='javascript:void(0)' onclick='personagens([[NOME]])'>"+item.name+"</a></td><td>"+item.created+"</td></tr>";
	 					var nome_person = '"'+item.name+'"';
						add_resultados_tabela = add_resultados_tabela.replace("[[NOME]]", nome_person);
						$("#tabela_search_body").append(add_resultados_tabela);
						})
	 				if(data.next != null){
	 					var link_next = data.next.replace('http://swapi.co/api/people/?page=' , '');
	 					swapiModule.getPeople(link_next, lista);
	 				}
				}

			 function pesquisa_sw() 
	 		 {
	 		 	$("#tabela_search_body").html("");
	 			var pesq = $("#input_pesquisar").val();
	 			var i = 1;
	 			var url_continuacao = i+"&search="+pesq;
	 			 	$("#tabela_search").html("<tr> <th>Nome</th> <th>Criação</th></tr>");
	 			swapiModule.getPeople(url_continuacao, lista );
			 }

		function personagens(nome)
		{
				var personagem = nome;
	 			var url_continuacao = "&search="+personagem;
	 			swapiModule.getPeople(url_continuacao, function(data) {
	 				data.results.forEach(function(item){
	 					var mundo = item.homeworld;
	 					var id1 = mundo.substr(28, 2);
						var id_planeta = id1.substr(0, 1);
						swapiModule.getPlanet(id_planeta,function(data) {
						var world = data.name;
	 					$("#tabela_info").html("<tr> <td>"+item.height+"</td> <td>"+item.mass+"</td> <td>"+item.gender+"</td> <td>"+world+"</td> </tr>");
						$("#nome").html("<i class='fa fa-info-circle'></i> "+item.name);
						imagens(personagem);
						})
					})
				});

			$("#section_search").hide();
	     	$("#section_info").fadeIn();
		}

		 $(document).ready(function() {
		$("#section_info").hide();
	 })

			$("#btn_voltar").click(function(){
	    	$("#section_info").hide();
	    	$("#section_search").fadeIn();
		})

			function imagens(nome){
				if(nome == "Yoda")
					$("#imagem").html('<img src="img/Yoda.ico" center>');
				else if(nome == "Luke Skywalker")
					$("#imagem").html('<img src="img/skywalker.ico" center>');
				else if(nome == "C-3PO")
					$("#imagem").html('<img src="img/C3PO.png" center>')
				else if(nome == "R2-D2")
					$("#imagem").html('<img src="img/r2-d2.png" center>')
				else if(nome == "Darth Vader")
					$("#imagem").html('<img src="img/vader.ico" center>')
				else if(nome == "Leia Organa")
					$("#imagem").html('<img src="img/Princess_Leia.png" center>')
				else if(nome == "Ki-Adi-Mundi")
					$("#imagem").html('<img src="img/Ki-Adi-Mundi-icon.png" center>')
				else if(nome == "Owen Lars")
					$("#imagem").html('<img src="img/Owen_Lars.png" center>')
				else if(nome == "Beru Whitesun lars")
					$("#imagem").html('<img src="img/lars.png" center>')
				else if(nome == "R5-D4")
					$("#imagem").html('<img src="img/r5d4.png" center>')
				else if(nome == "Biggs Darklighter")
					$("#imagem").html('<img src="img/biggs.png" center>')
				else if(nome == "Obi-Wan Kenobi")
					$("#imagem").html('<img src="img/Obi-wan-kenobi.png" center>')
				else if(nome == "Anakin Skywalker")
					$("#imagem").html('<img src="img/anakin.png" center>')
				else if(nome == "Wilhuff Tarkin")
					$("#imagem").html('<img src="img/Tarkin.png" center>')
				else if(nome == "Chewbacca")
					$("#imagem").html('<img src="img/Chewbacca.ico" center>')
				else if(nome == "Han Solo")
					$("#imagem").html('<img src="img/han.png" center>')
				else if(nome == "Greedo")
					$("#imagem").html('<img src="img/Greedo.png" center>')
				else if(nome == "Jabba Desilijic Tiure")
					$("#imagem").html('<img src="img/Jabba.png" center>')
				else if(nome == "Wedge Antilles")
					$("#imagem").html('<img src="img/Hellmy.png" center>')
				else if(nome == "Jek Tono Porkins")
					$("#imagem").html('<img src="img/jek.png" center>')
				else if(nome == "Palpatine")
					$("#imagem").html('<img src="img/palpa.ico" center>')
				else if(nome == "Nien Nunb")
					$("#imagem").html('<img src="img/nunb.png" center>')
				else if(nome == "Wicket Systri Warrick")
					$("#imagem").html('<img src="img/Wicket.png" center>')
				else if(nome == "Mon Mothma")
					$("#imagem").html('<img src="img/mon.png" center>')
				else if(nome == "Ackbar")
					$("#imagem").html('<img src="img/Ackbar.png" center>')
				else if(nome == "Lando Calrissian")
					$("#imagem").html('<img src="img/Lando.png" center>')
				else if(nome == "Bossk")
					$("#imagem").html('<img src="img/bossk.png" center>')
				else if(nome == "Boba Fett")
					$("#imagem").html('<img src="img/Boba-Fett-icon.png" center>')
				else if(nome == "Sebulba")
					$("#imagem").html('<img src="img/Sebulba.png" center>')


				

				
				

				

				

				

				
				


				
			}
