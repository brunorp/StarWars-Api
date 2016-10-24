		var pontos;
		var acertos;
		var completa_tabela;
		var acertou = 0;
		var errou = 0;
		var qtd_erros = 0;
		var filmes = "";
		var filmes2;
		var nome_tamanho;
		var nome_array;
		var count = 0;
		var guarda_char = new Array();
		var conta_dica;

		function lista(data) {
		    data.results.forEach(function(item) {
		        var add_resultados_tabela = "<tr><td><a href='#section_info' onclick='personagens([[NOME]])'>" + item.name + "</a></td><td>" + item.created + "</td></tr>";
		        var nome_person = '"' + item.name + '"';
		        add_resultados_tabela = add_resultados_tabela.replace("[[NOME]]", nome_person);
		        $("#tabela_search_body").append(add_resultados_tabela);
		    })
		    if (data.next != null) {
		        var next = data.next;
		        var char_especial = next.indexOf("&");
		        var search = (next.substring(28, char_especial)); // pega a url do char 28 até chegar em um "&".
		        var quebra_url = next.split('=');
		        var numero_pagina = quebra_url[2]; // pega a terceira string que está depois de um "=", que no caso é o número da página.
		        var monta_url = numero_pagina + "&" + search;
		        swapiModule.getPeople(monta_url, lista);
		    }
		}

		function pesquisa_sw() {
		    $("#tabela_search_body").html("");
		    var pesq = $("#input_pesquisar").val();
		    var i = 1;
		    var url_continuacao = i + "&search=" + pesq;
		    $("#tabela_search").html("<tr> <th>Nome</th> <th>Criação</th></tr>");
		    swapiModule.getPeople(url_continuacao, lista);
		}

		function personagens(nome) {
		    var personagem = nome;
		    var url_continuacao = "&search=" + personagem;
		    swapiModule.getPeople(url_continuacao, function(data) {
		        data.results.forEach(function(item) {
		          //  var url_personagem = item.url;
		          //  var quebra_url_personagem = url_personagem.split("/");
		         //   var id_personagem = quebra_url_personagem[5];
		            var mundo = item.homeworld;
		            var quebra_url_planeta = mundo.split("/");
		            var id_planeta = quebra_url_planeta[5];
		            swapiModule.getPlanet(id_planeta, function(valor) {
		             //   filmes2 = retorna_filme(id_personagem);
		                
		                    completa_tabela = "<tr> <td>" + item.height + "</td> <td>" + item.mass + "</td> <td>" + item.gender + "</td> <td>" + valor.name + "</td></tr>";
		                    $("#tabela_info").html(completa_tabela);
		                    $("#nome").html("<i class='fa fa-info-circle'></i> " + item.name);
		                    imagens(personagem);
		            })
		        })
		    })

		    $("#section_search").hide();
		    $("#section_info").fadeIn();
		}

		$(document).ready(function() {
		    $("#titulo_quiz1").hide();
		    $("#titulo_quiz2").hide();
		    $("#titulo_forca").hide();
		    $("#btn_voltar_ent").hide();
		    $("#section_info").hide();
		    $("#parte1_forca").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte7_quiz2").hide();
		    $("#parte8_quiz2").hide();
		    $("#subtitulo_forca").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte3").hide();
		    $("#parte4").hide();
		    $("#parte5").hide();
		    $("#parte7_resultado").hide();
		    $("#parte6").hide();
		})
		$("#btn_repeat").on('click', function() {
		    pontos = 0;
		    $("#input_nome_quiz1").html('<h2 id="input_nome_quiz1"><input type="text" id="inpt_nome" placeholder="Digite o seu nome"></h2>');
		    $("#parte1").fadeIn(1500);
		    $("#parte2").hide();
		    $("#parte6").hide();
		    $("#parte4").hide();
		    $("#parte3").hide();
		    $("#menu_ent").hide();
		    $("#parte5").hide();
		    $("#parte7_resultado").hide();
		})
		$("#btn_repeat_quiz2").on('click', function() {
		    acertou = 0;
		    $("#input_nome_quiz2").html('<h2 id="input_nome_quiz2"><input type="text" id="inpt_nome2" placeholder="Digite o seu nome"></h2>');
		    $("#parte1_quiz2").fadeIn(500);
		    $("#parte2_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte7_quiz2").hide();
		    $("#parte8_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		})

		$("#btn_voltar").on('click', function() {
		    $("#section_info").hide();
		    $("#section_search").fadeIn();
		})
		$("#btn_avancar1").on('click', function() {
		    $("#parte1").hide();
		    $("#parte3").hide();
		    $("#parte7_resultado").hide();
		    $("#parte4").hide();
		    $("#parte5").hide();
		    $("#menu_ent").hide();
		    $("#parte6").hide();
		    $("#parte2").fadeIn(4000);
		    swapiModule.getPlanet(1, function(data) {
		        swapiModule.getPlanet(3, function(item) {
		            swapiModule.getPlanet(2, function(valor) {
		                swapiModule.getPlanet(4, function(nome) {
		                    $("#corpo_tabela_quiz").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1" value="1">&nbsp;&nbsp;<span class="checkboxtext">' + data.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1" value="2">&nbsp;&nbsp;<span class="checkboxtext">' + item.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1" value="3">&nbsp;&nbsp;<span class="checkboxtext">' + valor.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1" value="5">&nbsp;&nbsp;<span class="checkboxtext">' + nome.name + '</span></td> </tr>');
		                })
		            })
		        })
		    })
		})
		$("#btn_avancar2").on('click', function() {
		    pontos = getRadioValor("questao1");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte4").hide();
		    $("#menu_ent").hide();
		    $("#parte5").hide();
		    $("#parte7_resultado").hide();
		    $("#parte6").hide();
		    $("#parte3").fadeIn(1500);
		    $("#corpo_tabela_quiz2").html('<tr> <td colspan="3">&nbsp;&nbsp;<input type="radio" name="questao2" value="1">&nbsp;&nbsp;<span class="checkboxtext">Sua falta de fé é perturbadora</span></td> </tr> <tr><td colspan="3">&nbsp;&nbsp;<input type="radio" name="questao2" value="2">&nbsp;&nbsp;<span class="checkboxtext">Devemos fazer todo o possível para deixar este planeta. Como jedi, seu dever é fazer o melhor para o grupo.</span></td> </tr> <tr> <td colspan="3">&nbsp;&nbsp;<input type="radio" name="questao2" value="3">&nbsp;&nbsp;<span class="checkboxtext">Tamanho importa não. Olhe para mim, você julga a mim pelo tamanho?</span></td> </tr> <tr> <td colspan="3">&nbsp;&nbsp;<input type="radio" name="questao2" value="5">&nbsp;&nbsp;<span class="checkboxtext">Os Jedi são os guardiões da paz. Não soldados.</span></td> </tr>');
		})
		$("#btn_avancar3").on('click', function() {
		    pontos += getRadioValor("questao2");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#menu_ent").hide();
		    $("#parte3").hide();
		    $("#parte7_resultado").hide();
		    $("#parte5").hide();
		    $("#parte6").hide();
		    $("#parte4").fadeIn(1500);
		    $("#corpo_tabela_quiz3").html('<tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3" value="1">&nbsp;&nbsp;<span class="checkboxtext">Vermelho</span></td> </tr> <tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3" value="2">&nbsp;&nbsp;<span class="checkboxtext">Azul</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3" value="4">&nbsp;&nbsp;<span class="checkboxtext">Verde</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3" value="4">&nbsp;&nbsp;<span class="checkboxtext">Roxo</span></td> </tr>');
		})
		$("#btn_avancar4").on('click', function() {
		    pontos += getRadioValor("questao3");
		    $("#parte1").hide();
		    $("#menu_ent").hide();
		    $("#parte2").hide();
		    $("#parte3").hide();
		    $("#parte4").hide();
		    $("#parte6").hide();
		    $("#parte7_resultado").hide();
		    $("#parte5").fadeIn(1500);
		    $("#corpo_tabela_quiz4").html('<tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4" value="1">&nbsp;&nbsp;<span class="checkboxtext">Carisma</span></td> </tr> <tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4" value="3">&nbsp;&nbsp;<span class="checkboxtext">Agilidade</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4" value="4">&nbsp;&nbsp;<span class="checkboxtext">auto-disciplina</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4" value="5">&nbsp;&nbsp;<span class="checkboxtext">Determinado</span></td> </tr>');
		})
		$("#btn_avancar5").on('click', function() {
		    pontos += getRadioValor("questao4");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#menu_ent").hide();
		    $("#parte3").hide();
		    $("#parte4").hide();
		    $("#parte5").hide();
		    $("#parte7_resultado").hide();
		    $("#parte6").fadeIn(1500);
		    $("#corpo_tabela_quiz5").html('<tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5" value="1">&nbsp;&nbsp;<span class="checkboxtext">Quero escolher os dois</span></td> </tr> <tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5" value="2">&nbsp;&nbsp;<span class="checkboxtext">Armas</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5" value="4">&nbsp;&nbsp;<span class="checkboxtext">Cérebro</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5" value="5">&nbsp;&nbsp;<span class="checkboxtext">Qualquer um</span></td> </tr>');
		})
		$("#btn_avancar6").on('click', function() {
		    pontos += getRadioValor("questao5");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte3").hide();
		    $("#parte4").hide();
		    $("#menu_ent").hide();
		    $("#parte5").hide();
		    $("#parte6").hide();
		    $("#parte7_resultado").fadeIn(2500);
		    var nome = $("#inpt_nome").val();
		    if (pontos <= 7)
		        $("#corpo_tabela_quiz6").html('<tr> <th rowspan="5"><img src="img/vader_result.ico"></th> <th colspan="10"><span style="font-size:25px;">' + nome + ' você se parece mais com o: <br><u>Darth Vader!</u></span></th> </tr>');
		    else if (pontos >= 8 && pontos <= 13)
		        $("#corpo_tabela_quiz6").html('<tr> <th rowspan="5"><img src="img/Aayla.png"></th> <th colspan="10"><span style="font-size:25px;">' + nome + ' você se parece mais com a: <br><u>Aayla Secura!</u></span></th> </tr>');
		    else if (pontos >= 14 && pontos <= 19)
		        $("#corpo_tabela_quiz6").html('<tr> <th rowspan="5"><img src="img/yoda_result.png"></th> <th colspan="10"><span style="font-size:25px;">' + nome + ' você se parece mais com o: <br><u>Mestre Yoda!</u></span></th> </tr>');
		    else if (pontos >= 20 && pontos <= 24)
		        $("#corpo_tabela_quiz6").html('<tr> <th rowspan="5"><img src="img/windu_result.ico"></th> <th colspan="10"><span style="font-size:25px;">' + nome + ' você se parece mais com o: <br><u>Mace Windu!</u></span></th> </tr>');
		})
		$("#btn_avancar1_quiz2").on('click', function() {
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte2_quiz2").fadeIn(1500);
		    swapiModule.getPlanet(1, function(data) {
		        swapiModule.getPlanet(3, function(item) {
		            swapiModule.getPlanet(2, function(valor) {
		                swapiModule.getPlanet(4, function(nome) {
		                    $("#corpo_tabela_quiz_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">' + data.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">' + item.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">' + valor.name + '</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao1_2" value="4">&nbsp;&nbsp;<span class="checkboxtext">' + nome.name + '</span></td> </tr>');
		                })
		            })
		        })
		    })
		})
		$("#btn_avancar2_quiz2").on('click', function() {
		    acertos = getRadioValor("questao1_2")
		    if (acertos == 1)
		        acertou++;
		    var conteudo_td = '';
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte3_quiz2").fadeIn(1500);

		    swapiModule.getPerson(35, function(data) {
		        data.films.forEach(function(item) {
		            var filme = item;
		            var quebra_url2 = filme.split("/");
		            var filme_id = quebra_url2[5];
		            swapiModule.getFilm(filme_id, function(data2) {
		                conteudo_td += '<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao2_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">' + data2.title + '</span></td> </tr>';
		                $("#corpo_tabela_quiz2_2").html(conteudo_td);
		            })
		        })
		    })
		})
		$("#btn_avancar3_quiz2").on('click', function() {
		    acertos = getRadioValor("questao2_2")
		    if (acertos == 2)
		        acertou++;
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte4_quiz2").fadeIn(1500);
		    $("#corpo_tabela_quiz3_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">Yoda</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">Dookan</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">Mace Windu</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao3_2" value="4">&nbsp;&nbsp;<span class="checkboxtext">Qui Gon Jinn</span></td> </tr>');
		})
		$("#btn_avancar4_quiz2").on('click', function() {
		    acertos = getRadioValor("questao3_2")
		    if (acertos == 4)
		        acertou++;
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte5_quiz2").fadeIn(1500);
		    $("#corpo_tabela_quiz4_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">Primos</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">Irmãos</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">Namorados</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao4_2" value="4">&nbsp;&nbsp;<span class="checkboxtext">Amigos</span></td> </tr>');
		})

		$("#btn_avancar5_quiz2").on('click', function() {
		    acertos = getRadioValor("questao4_2")
		    if (acertos == 2)
		        acertou++;
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte6_quiz2").fadeIn(1500);
		    $("#corpo_tabela_quiz5_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">C-3PO</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">R2-D4</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">C-4PO</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao5_2" value="4">&nbsp;&nbsp;<span class="checkboxtext">R2-D2</span></td> </tr>');
		})
		$("#btn_avancar6_quiz2").on('click', function() {
		    acertos = getRadioValor("questao5_2")
		    if (acertos == 1)
		        acertou++;
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte7_quiz2").fadeIn(1500);
		    $("#corpo_tabela_quiz6_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao6_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">Luke, eu sou seu pai</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao6_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">Não, eu sou seu pai</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao6_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">Não Luke, eu sou seu pai</span></td> </tr>');
		})
		$("#btn_avancar7_quiz2").on('click', function() {
		    acertos = getRadioValor("questao6_2")
		    if (acertos == 2)
		        acertou++;
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte7_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte8_quiz2").fadeIn(1500);
		    $("#corpo_tabela_quiz7_2").html('<tr><td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao7_2" value="1">&nbsp;&nbsp;<span class="checkboxtext">Irmãos</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao7_2" value="2">&nbsp;&nbsp;<span class="checkboxtext">Pai e filho</span></td> </tr> <tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao7_2" value="3">&nbsp;&nbsp;<span class="checkboxtext">Tio e sobrinho</span></td> </tr><tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao7_2" value="4">&nbsp;&nbsp;<span class="checkboxtext">Nenhuma relação</span></td> </tr><tr> <td></td> <td colspan="2">&nbsp;&nbsp;<input type="radio" name="questao7_2" value="5">&nbsp;&nbsp;<span class="checkboxtext">Nenhuma das alternativas</span></td> </tr>');
		})
		$("#btn_avancar8_quiz2").on('click', function() {
		    acertos = getRadioValor("questao7_2")
		    if (acertos == 5)
		        acertou++;
		    var nome = $("#inpt_nome2").val();
		    $("#menu_ent").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte2_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte7_quiz2").hide();
		    $("#parte8_quiz2").hide();
		    $("#parteX_resultado_quiz2").fadeIn(1500);
		    if (acertou <= 3)
		        $("#corpo_tabela_quizX_2").html('<tr> <th rowspan="5"><img src="img/yoda_result.png"><span style="font-size:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + acertou + '/7</span></th> <th><span style="font-size:30px;">Vish ' + nome + '... Acho que você precisa assistir mais vezes os filmes ):</span></th> </tr>');
		    else if (acertou <= 5)
		        $("#corpo_tabela_quizX_2").html('<tr> <th rowspan="5"><img src="img/yoda_result.png"><span style="font-size:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + acertou + '/7</span></th> <th><span style="font-size:30px;">É ' + nome + '... Já da pra dizer que sabe <strong><u>UM POUCO</u></strong> sobre Star Wars :) Parabéns! Ha ha ha ha</span></th> </tr>');
		    else if (acertou <= 6)
		        $("#corpo_tabela_quizX_2").html('<tr> <th rowspan="5"><img src="img/yoda_result.png"><span style="font-size:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + acertou + '/7</span></th> <th><span style="font-size:30px;">Boa ' + nome + '... Foi quase em! Já da pra discutir sobre a saga com você! :)</span></th> </tr>');
		    else if (acertou == 7)
		        $("#corpo_tabela_quizX_2").html('<tr> <th rowspan="5"><img src="img/yoda_result.png"><span style="font-size:30px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + acertou + '/7</span></th> <th><span style="font-size:30px;">Não acredito ' + nome + '... Você que criou o Star Wars? George Walton Lucas Junior? Por que escreveu seu nome errado? Achou que eu não ia descobrir? Sou seu fã :)</span></th> </tr>');
		})

		$("#btn_voltar1").on('click', function() {
		    $("#parte2").hide();
		    $("#titulo_forca").hide();
		    $("#subtitulo_forca").hide();
		    $("#titulo_quiz1").hide();
		    $("#titulo_quiz2").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_quiz2").hide();
		    $("#parte3").hide();
		    $("#parte5").hide();
		    $("#parte6").hide();
		    $("#parte4").hide();
		    $("#parte1").hide();
		    $("#titulo_ent").show();
		    $("#subtitulo_ent").show();
		    $("#menu_ent").fadeIn(1500);
		})
		$("#btn_voltar2").on('click', function() {
		    $("#parte2").hide();
		    $("#parte3").hide();
		    $("#menu_ent").hide();
		    $("#parte5").hide();
		    $("#parte6").hide();
		    $("#parte4").hide();
		    $("#parte1").fadeIn(1500);
		})
		$("#btn_voltar3").on('click', function() {
		    pontos -= getRadioValor("questao1");
		    $("#parte1").hide();
		    $("#parte3").hide();
		    $("#parte5").hide();
		    $("#menu_ent").hide();
		    $("#parte4").hide();
		    $("#parte6").hide();
		    $("#parte2").fadeIn(1500);
		})
		$("#btn_voltar4").on('click', function() {
		    pontos -= getRadioValor("questao2");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte4").hide();
		    $("#parte5").hide();
		    $("#menu_ent").hide();
		    $("#parte6").hide();
		    $("#parte3").fadeIn(1500);
		})
		$("#btn_voltar5").on('click', function() {
		    pontos -= getRadioValor("questao3");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte6").hide();
		    $("#parte5").hide();
		    $("#menu_ent").hide();
		    $("#parte3").hide();
		    $("#parte4").fadeIn(1500);
		})
		$("#btn_voltar6").on('click', function() {
		    pontos -= getRadioValor("questao4");
		    $("#parte1").hide();
		    $("#parte2").hide();
		    $("#parte6").hide();
		    $("#parte4").hide();
		    $("#parte3").hide();
		    $("#menu_ent").hide();
		    $("#parte5").fadeIn(1500);
		})

		$("#btn_quiz1").on('click', function() {
		    $("#titulo_ent").hide();
		    $("#subtitulo_quiz2").hide();
		    $("#subtitulo_ent").hide();
		    $("#parte2").hide();
		    $("#parte6").hide();
		    $("#parte4").hide();
		    $("#parte3").hide();
		    $("#titulo_forca").hide();
		    $("#subtitulo_forca").hide();
		    $("#parte5").hide();
		    $("#menu_ent").hide();
		    $("#titulo_quiz1").show();
		    $("#subtitulo_quiz1").show();
		    $("#parte1").fadeIn(1500);
		})
		$("#btn_quiz2").on('click', function() {
		    $("#titulo_ent").hide();
		    $("#titulo_quiz1").hide();
		    $("#parte2_quiz2").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_ent").hide();
		    $("#menu_ent").hide();
		    $("#titulo_forca").hide();
		    $("#subtitulo_forca").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#subtitulo_quiz2").show();
		    $("#titulo_quiz2").show();
		    $("#parte1_quiz2").fadeIn(1500);
		})
		$("#btn_forca").on('click', function() {
		    $("#titulo_ent").hide();
		    $("#titulo_quiz1").hide();
		    $("#parte2_quiz2").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_ent").hide();
		    $("#menu_ent").hide();
		    $("#titulo_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#btn_voltar_ent").fadeIn(1500);
		    $("#subtitulo_forca").show();
		    $("#titulo_forca").show();
		    $("#parte1_forca").fadeIn(1500);

		    qtd_erros = 0;
		    conta_dica = 0;
		    count = 0;
		    guarda_char = "";
		    var id_personagem = parseInt(Math.random() * 88 + 1);
		    if(id_personagem == 17)
		    {
		    	 id_personagem = parseInt(Math.random() * 88 + 1);
		    }

		    swapiModule.getPerson(id_personagem, function(data){
		    	var nome = data.name;
		    	 nome_tamanho = new Array(nome.length);
		    	for(var i=0; i<nome.length; i++){
		    	if(nome.length>5)
		    		if(i==6)
		    		nome_tamanho[i]="__";
		    	else
		    	nome_tamanho[i]="__";
		    	if (nome.charAt(i) == " ")
                {
                    nome_tamanho[i] = " ";
                    count++;
                }
                else
                	if(nome.charAt(i) == "-")
                	{
                		 nome_tamanho[i] = "-";
                		 count++;
                	}
                else 
                	if(nome.charAt(i) == "é")
               		 {
                		nome[i] = "e";
               		 }
                else
                	nome_tamanho[i] = "__";

		    }
		    var nome = removerAcentos(nome);
		    var nome_person = "'" + nome.toUpperCase() + "'";
		    console.log(nome);
		    var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">'+nome_tamanho+'</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" onkeyup="verifica([[NOME]])" style="width:200px;" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/yoda_result.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
   			conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
   			$("#form_forca").html(conteudo_forca);
   			document.form_forca.txtLetra.focus();
		})
		    })

		function removerAcentos( nome ) {
		var acentos = {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in acentos ) {
		var expressao = acentos[letra];
		nome = nome.replace( expressao, letra );
	}

	return nome;
}

			function verifica(nome)
			{   
				var letra = $("#inpt_forca").val();
				letra = letra.toUpperCase();
				for (var x = 0; x<guarda_char.length;x++){
					if(letra == guarda_char[x]){
						alert("LETRA JÁ DIGITADA");
						document.getElementById('inpt_forca').value='';
						return;
					}

				}
						guarda_char += letra;
				errou = 0;

		    	for (var i = 0; i < nome.length; i++) {   
                       if((nome[i] == letra))
                        {
                            nome_tamanho[i] = letra;
          		         	errou = 2;
                            count ++;
                            console.log(count);
		         	var nome_person = "'" + nome.toUpperCase() + "'";
		         	var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">'+nome_tamanho+'</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/yoda_result.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		         	conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		         	$("#form_forca").html(conteudo_forca);	
		         	  document.form_forca.txtLetra.focus();
		           	}
		         	else 
		         		if(errou != 2)
		         			errou = 1;	         	       	
        	} 
        			if(count == nome_tamanho.length){
        				alert("Ganhou!");
        				var conteudo_forca = '<p>PARABÉNS!</p>';
        				$("#form_forca").append(conteudo_forca);	
        			$("#inpt_forca").prop('disabled', true);
        			}
;
        		       if(errou == 1){
        		       	alert("Errou ):");
		         		qtd_erros += 1;
		         		var nome_person = "'" + nome.toUpperCase() + "'";
		         		var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">'+nome_tamanho+'</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/yoda_result.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		         		conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		         		$("#form_forca").html(conteudo_forca);
		         		 document.form_forca.txtLetra.focus();	
		         		}
		         		if(qtd_erros == 3){
		         			if(conta_dica == 0){
		         			for(var n = 0; n <nome_tamanho.length; n++){
		         				if(nome_tamanho[n] == "__"){
		         					conta_dica = 1;
		         					var dica = n+1;
		         			var conteudo_forca = '<br><br><p>Dica: '+dica+'ª letra: '+nome[n]+'</p><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">'+nome_tamanho+'</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" name="txtLetra" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:40px;"><img src="img/yoda_result.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		         			conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		         			$("#form_forca").html(conteudo_forca);
		         			 document.form_forca.txtLetra.focus();
		         			return;
		         				}
		         			}	
		         		}
		         		else
		         			return;
		         	}
		         		if (qtd_erros == 6) {
		         			alert("Perdeu ):");
		         		var nome_person = "'" + nome.toUpperCase() + "'";
		         		var conteudo_forca2 = '<p>O personagem era:</p>';
		         		var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">'+nome+'</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" placeholder=" Letra..." disabled></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/yoda_result.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		         		$("#form_forca").html(conteudo_forca);	
		         		$("#form_forca").append(conteudo_forca2);	
		         		}
        	}
        


		$("#btn_voltar1_quiz2").on('click', function() {
		    $("#parte2_quiz2").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_quiz2").hide();
		    $("#titulo_forca").hide();
		    $("#titulo_quiz1").hide();
		    $("#titulo_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#titulo_ent").show();
		    $("#subtitulo_ent").show();
		    $("#menu_ent").fadeIn(1500);
		})
		$("#btn_voltar2_quiz2").on('click', function() {
		    $("#parte2_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte1_quiz2").fadeIn(1500);
		})
		$("#btn_voltar3_quiz2").on('click', function() {
		    acertos = getRadioValor("questao1_2");
		    if (acertos == 1)
		        acertou--;
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte2_quiz2").fadeIn(1500);
		})
		$("#btn_voltar4_quiz2").on('click', function() {
		    acertos = getRadioValor("questao2_2");
		    if (acertos == 2)
		        acertou--;
		    $("#parte2_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte3_quiz2").fadeIn(1500);
		})
		$("#btn_voltar5_quiz2").on('click', function() {
		    acertos = getRadioValor("questao3_2")
		    if (acertos == 4)
		        acertou--;
		    $("#parte2_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte4_quiz2").fadeIn(1500);
		})
		$("#btn_voltar6_quiz2").on('click', function() {
		    acertos = getRadioValor("questao4_2")
		    if (acertos == 2)
		        acertou--;
		    $("#parte2_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte5_quiz2").fadeIn(1500);
		})
		$("#btn_voltar7_quiz2").on('click', function() {
		    acertos = getRadioValor("questao5_2")
		    if (acertos == 1)
		        acertou--;
		    $("#parte2_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte7_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte6_quiz2").fadeIn(1500);
		})
		$("#btn_voltar8_quiz2").on('click', function() {
		    acertos = getRadioValor("questao6_2")
		    if (acertos == 2)
		        acertou--;
		    $("#parte2_quiz2").hide();
		    $("#parte1_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parte8_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte7_quiz2").fadeIn(1500);
		})
		$("#btn_voltar_ent").on('click', function() {
			$("#parte1_forca").hide();
		    $("#subtitulo_quiz1").hide();
		    $("#subtitulo_quiz2").hide();
		    $("#subtitulo_forca").hide();
		    $("#btn_voltar_ent").hide();
		    $("#titulo_forca").hide();
		    $("#titulo_quiz1").hide();
		    $("#titulo_quiz2").hide();
		    $("#titulo_ent").show();
		    $("#subtitulo_ent").show();
		    $("#menu_ent").fadeIn(1500);
		})

		function getRadioValor(name) {
		    var botao_radio = document.getElementsByName(name);
		    for (var i = 0; i < botao_radio.length; i++) {
		        if (botao_radio[i].checked) {
		            var valor = parseInt(botao_radio[i].value);
		            return valor;
		        }

		    }
		    return null;
		}

		function imagens(nome) {
		    if (nome == "Yoda")
		        $("#imagem").html('<img src="img/Yoda.ico" center>');
		    else if (nome == "Luke Skywalker")
		        $("#imagem").html('<img src="img/skywalker.ico" center>');
		    else if (nome == "C-3PO")
		        $("#imagem").html('<img src="img/C3PO.png" center>')
		    else if (nome == "R2-D2")
		        $("#imagem").html('<img src="img/r2-d2.png" center>')
		    else if (nome == "Darth Vader")
		        $("#imagem").html('<img src="img/vader.ico" center>')
		    else if (nome == "Leia Organa")
		        $("#imagem").html('<img src="img/Princess_Leia.png" center>')
		    else if (nome == "Ki-Adi-Mundi")
		        $("#imagem").html('<img src="img/Ki-Adi-Mundi-icon.png" center>')
		    else if (nome == "Owen Lars")
		        $("#imagem").html('<img src="img/Owen_Lars.png" center>')
		    else if (nome == "Beru Whitesun lars")
		        $("#imagem").html('<img src="img/lars.png" center>')
		    else if (nome == "R5-D4")
		        $("#imagem").html('<img src="img/r5d4.png" center>')
		    else if (nome == "Biggs Darklighter")
		        $("#imagem").html('<img src="img/biggs.png" center>')
		    else if (nome == "Obi-Wan Kenobi")
		        $("#imagem").html('<img src="img/Obi-wan-kenobi.png" center>')
		    else if (nome == "Anakin Skywalker")
		        $("#imagem").html('<img src="img/anakin.png" center>')
		    else if (nome == "Wilhuff Tarkin")
		        $("#imagem").html('<img src="img/Tarkin.png" center>')
		    else if (nome == "Chewbacca")
		        $("#imagem").html('<img src="img/Chewbacca.ico" center>')
		    else if (nome == "Han Solo")
		        $("#imagem").html('<img src="img/han.png" center>')
		    else if (nome == "Greedo")
		        $("#imagem").html('<img src="img/Greedo.png" center>')
		    else if (nome == "Jabba Desilijic Tiure")
		        $("#imagem").html('<img src="img/Jabba.png" center>')
		    else if (nome == "Wedge Antilles")
		        $("#imagem").html('<img src="img/Hellmy.png" center>')
		    else if (nome == "Jek Tono Porkins")
		        $("#imagem").html('<img src="img/jek.png" center>')
		    else if (nome == "Palpatine")
		        $("#imagem").html('<img src="img/palpa.ico" center>')
		    else if (nome == "Nien Nunb")
		        $("#imagem").html('<img src="img/nunb.png" center>')
		    else if (nome == "Wicket Systri Warrick")
		        $("#imagem").html('<img src="img/Wicket.png" center>')
		    else if (nome == "Mon Mothma")
		        $("#imagem").html('<img src="img/mon.png" center>')
		    else if (nome == "Ackbar")
		        $("#imagem").html('<img src="img/Ackbar.png" center>')
		    else if (nome == "Lando Calrissian")
		        $("#imagem").html('<img src="img/Lando.png" center>')
		    else if (nome == "Bossk")
		        $("#imagem").html('<img src="img/bossk.png" center>')
		    else if (nome == "Boba Fett")
		        $("#imagem").html('<img src="img/Boba-Fett-icon.png" center>')
		    else if (nome == "Sebulba")
		        $("#imagem").html('<img src="img/Sebulba.png" center>')
		    else if (nome == "Qui-Gon Jinn")
		        $("#imagem").html('<img src="img/Qui.png" center>')
		    else if (nome == "Nute Gunray")
		        $("#imagem").html('<img src="img/Nute.png" center>')
		    else if (nome == "Finis Valorum")
		        $("#imagem").html('<img src="img/valorum.png" center>')
		    else if (nome == "Jar Jar Binks")
		        $("#imagem").html('<img src="img/Jar.png" center>')
		    else if (nome == "Roos Tarpals")
		        $("#imagem").html('<img src="img/tarpals.png" center>')
		    else if (nome == "Rugor Nass")
		        $("#imagem").html('<img src="img/nass.png" center>')
		    else if (nome == "Ric Olié")
		        $("#imagem").html('<img src="img/ric.png" center>')
		    else if (nome == "Watto")
		        $("#imagem").html('<img src="img/watto.png" center>')
		    else if (nome == "Quarsh Panaka")
		        $("#imagem").html('<img src="img/panaka.jpg" center>')
		    else if (nome == "Shmi Skywalker")
		        $("#imagem").html('<img src="img/shmi.png" center>')
		    else if (nome == "Darth Maul")
		        $("#imagem").html('<img src="img/maul.png" center>')
		    else if (nome == "Bib Fortuna")
		        $("#imagem").html('<img src="img/bib.png" center>')
		    else if (nome == "Ayla Secura")
		        $("#imagem").html('<img src="img/Aayla.png" center>')
		    else if (nome == "Dud Bolt")
		        $("#imagem").html('<img src="img/Dud.jpg" center>')
		    else if (nome == "Gasgano")
		        $("#imagem").html('<img src="img/gasgano.png" center>')
		    else if (nome == "Ben Quadinaros")
		        $("#imagem").html('<img src="img/ben.png" center>')
		    else if (nome == "Mace Windu")
		        $("#imagem").html('<img src="img/windu.png" center>')
		    else if (nome == "Kit Fisto")
		        $("#imagem").html('<img src="img/fisto.png" center>')
		    else if (nome == "Eeth Koth")
		        $("#imagem").html('<img src="img/koth.png" center>')
		    else if (nome == "Adi Gallia")
		        $("#imagem").html('<img src="img/galia.png" center>')
		    else if (nome == "Saesee Tiin")
		        $("#imagem").html('<img src="img/tiin.png" center>')
		    else if (nome == "Yarael Poof")
		        $("#imagem").html('<img src="img/poof.jpg" center>')
		    else if (nome == "Plo Koon")
		        $("#imagem").html('<img src="img/koon.png" center>')
		    else if (nome == "Mas Amedda")
		        $("#imagem").html('<img src="img/Amedda.png" center>')
		    else if (nome == "Gregar Typho")
		        $("#imagem").html('<img src="img/typho.png" center>')
		    else if (nome == "Cliegg Lars")
		        $("#imagem").html('<img src="img/lars2.png" center>')
		    else if (nome == "Poggle the Lesser")
		        $("#imagem").html('<img src="img/lesser.png" center>')
		    else if (nome == "Luminara Unduli")
		        $("#imagem").html('<img src="img/luminara.jpg" center>')
		    else if (nome == "Barriss Offee")
		        $("#imagem").html('<img src="img/barriss.png" center>')
		    else if (nome == "Dooku")
		        $("#imagem").html('<img src="img/Dooku.png" center>')
		    else if (nome == "Jango Fett")
		        $("#imagem").html('<img src="img/fett.png" center>')
		    else if (nome == "Dexter Jettster")
		        $("#imagem").html('<img src="img/dexter.jpg" center>')
		    else if (nome == "Lama Su")
		        $("#imagem").html('<img src="img/xx.png" center>')
		    else if (nome == "Taun We")
		        $("#imagem").html('<img src="img/xx.png" center>')
		    else if (nome == "Jocasta Nu")
		        $("#imagem").html('<img src="img/jocasta.png" center>')
		    else if (nome == "Ratts Tyerell")
		        $("#imagem").html('<img src="img/rats.png" center>')
		    else if (nome == "R4-P17")
		        $("#imagem").html('<img src="img/r2.jpg" center>')
		    else if (nome == "Wat Tambor")
		        $("#imagem").html('<img src="img/wat.png" center>')
		    else if (nome == "San Hill")
		        $("#imagem").html('<img src="img/hill.png" center>')
		    else if (nome == "Shaak Ti")
		        $("#imagem").html('<img src="img/shaak.png" center>')
		    else if (nome == "Tarfful")
		        $("#imagem").html('<img src="img/Tarrful.png" center>')
		    else if (nome == "Tion Medon")
		        $("#imagem").html('<img src="img/Pauan.png" center>')
		    else if (nome == "BB8")
		        $("#imagem").html('<img src="img/bb8.png" center>')
		    else if (nome == "Padmé Amidala")
		        $("#imagem").html('<img src="img/padme.png" center>')
		}