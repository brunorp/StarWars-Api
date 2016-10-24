		var pontos; // pontos do primeiro quiz
		var acertos; // acertos do segundo quiz
		var completa_tabela; // completa a tabela com algumas informações do personagem
		var acertou = 0; // "boolean" para contar acertos do segundo quiz
		var errou = 0; // "boolean" para ver se teve erro no jogo da forca
		var qtd_erros = 0; // quantidade de erros no jogo da forca
		var nome_tamanho; // Tamanho do nome em "__", "__" para a forca
		var count = 0; // conta a quantidade de caracteres digitados corretamente para a validação de ganhou ou perdeu no jogo da forca
		var guarda_char = new Array(); // guarda os caracteres digitados no jogo da forca, para nao poder digitar duas vezes o mesmo
		var conta_dica; // "Boolean" para garantir que só terá uma dica por palavra

		// Exibe a lista de personagens de acordo com a pesquisa
		function lista(data) {
		    data.results.forEach(function(item) {
		            var add_resultados_tabela = "<tr><td><a href='#section_info' onclick='personagens([[NOME]])'>" + item.name + "</a></td><td>" + item.created + "</td></tr>";
		            var nome_person = '"' + item.name + '"';
		            add_resultados_tabela = add_resultados_tabela.replace("[[NOME]]", nome_person);
		            $("#tabela_search_body").append(add_resultados_tabela);
		        })

		        // Se a tiver mais de uma página de personagens na pesquisa, pega o conteúdo do "next" e continua a recolher os dados da próxima página, até o "next" for nulo.
		    if (data.next != null) {
		        var next = data.next;
		        var char_especial = next.indexOf("&");
		        var search = (next.substring(28, char_especial)); // pega a url do char 28 até chegar em um "&".
		        var quebra_url = next.split('='); // divide a url em partes, sempre que chegar em um "=", a url é dividida
		        var numero_pagina = quebra_url[2]; // pega a terceira string que está depois de um "=", que no caso é o número da página.
		        var monta_url = numero_pagina + "&" + search; // monta a url da maneira correta "http://swapi.co/api/people/?page=2&search=p" por exemplo.
		        swapiModule.getPeople(monta_url, lista); // pesquisa na próxima pagina.
		    }
		}

		//Faz a pesquisa dos personagens e chama a função "lista"
		function pesquisa_sw() {
		    $("#tabela_search_body").html("");
		    var pesq = $("#input_pesquisar").val();
		    var i = 1;
		    var url_continuacao = i + "&search=" + pesq;
		    $("#tabela_search").html("<tr> <th>Nome</th> <th>Criação</th></tr>");
		    swapiModule.getPeople(url_continuacao, lista);
		}

		// Pesquisa e exibe informações mais detalhadas sobre o personagem escolhido na pesquisa
		function personagens(nome) {
		    var personagem = nome;
		    var url_continuacao = "&search=" + personagem;
		    swapiModule.getPeople(url_continuacao, function(data) {
		        data.results.forEach(function(item) {
		            var mundo = item.homeworld;
		            var quebra_url_planeta = mundo.split("/");
		            var id_planeta = quebra_url_planeta[5];
		            swapiModule.getPlanet(id_planeta, function(valor) {

		                completa_tabela = "<tr> <td>" + item.height + "</td> <td>" + item.mass + "</td> <td>" + item.gender + "</td> <td>" + valor.name + "</td></tr>";
		                $("#tabela_info").html(completa_tabela);
		                $("#nome").html("<i class='fa fa-info-circle'></i> " + item.name);
		                $("#imagem").html(imagens(personagem));
		            })
		        })
		    })

		    $("#section_search").hide();
		    $("#section_info").fadeIn();
		}


		// Ao carregar a página esconde algumas divs, titulos e tabelas
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

		//Ao clicar no botão "btn_repeat", a pessoa irá refazer o quiz 1
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

		//Ao clicar no botão "btn_repeat", a pessoa irá refazer o quiz 2
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

		//Ao clicar no "btn_voltar", volta para a pesquisa de personagens
		$("#btn_voltar").on('click', function() {
		    $("#section_info").hide();
		    $("#section_search").fadeIn();
		})

		// Ao clicar no "btn_avancar1", avança para o inicio do primeiro quiz e faz a pesquisa dos planetas da questao 1
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

		// Ao clicar no "btn_avancar2", avança para a segunda questão do primeiro quiz e verifica pontos
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

		// Ao clicar no "btn_avancar3", avança para a terceira questão do primeiro quiz e verifica pontos
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

		// Ao clicar no "btn_avancar4", avança para a quarta questão do primeiro quiz e verifica pontos
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

		// Ao clicar no "btn_avancar5", avança para a quinta questão do primeiro quiz e verifica pontos
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

		// Ao clicar no "btn_avancar6", avança para o resultado do primeiro quiz
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

		// Ao clicar no "btn_avancar1_quiz2", avança para o inicio do segundo quiz e faz a pesquisa dos planetas da primeira questão
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

		// Ao clicar no "btn_avancar2_quiz2", avança para a segunda questão do segundo quiz, verifica acertos e faz pesquisa de filmes do personagem 35
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

		// Ao clicar no "btn_avancar3_quiz2", avança para a terceira questão do segundo quiz e verifica acertos
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

		// Ao clicar no "btn_avancar3_quiz2", avança para a quarta questão do segundo quiz e verifica acertos
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

		// Ao clicar no "btn_avancar5_quiz2", avança para a quinta questão do segundo quiz e verifica acertos
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

		// Ao clicar no "btn_avancar6_quiz2", avança para a sexta questão do segundo quiz e verifica acertos
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

		// Ao clicar no "btn_avancar7_quiz2", avança para a setima questão do segundo quiz e verifica acertos
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

		// Ao clicar no "btn_avancar8_quiz2", avança para os resultados do segundo quiz
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

		// ao clicar no "btn_voltar1", volta para o menu de entretenimento
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

		// ao clicar no "btn_voltar2", volta para o início do primeiro quiz 
		$("#btn_voltar2").on('click', function() {
		        $("#parte2").hide();
		        $("#parte3").hide();
		        $("#menu_ent").hide();
		        $("#parte5").hide();
		        $("#parte6").hide();
		        $("#parte4").hide();
		        $("#parte1").fadeIn(1500);
		    })

		    // ao clicar no "btn_voltar3", volta para a segunda questão do primeiro quiz e diminui os pontos obtidos
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

		// ao clicar no "btn_voltar4", volta para a terceira questão do primeiro quiz e diminui os pontos obtidos
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

		// ao clicar no "btn_voltar5", volta para a quarta questão do primeiro quiz e diminui os pontos obtidos
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

		    // ao clicar no "btn_voltar6", volta para a quinta questão do primeiro quiz e diminui os pontos obtidos
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

		    // ao clicar no "btn_quiz1", abre a janela de início do primeiro quiz (digitar o nome)
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

		// ao clicar no "btn_quiz2", abre a janela de início do segundo quiz (digitar o nome)
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

		// ao clicar no "btn_forca", abre a janela do jogo da forca, inicializa a quantidade de erros com 0, a contagem de dica com 0, a quantidade de caracteres certos com 0 e a guarda_char com 0, sorteia um personagem para ser a palavra do jogo, faz verificações e exibe na tela o inicio do jogo.
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

		    // Se o personagem sorteado for o personagem 17, o sistema faz o sorteio novamente pois o personagem 17 não existe
		    if (id_personagem == 17) {
		        id_personagem = parseInt(Math.random() * 88 + 1);
		    }

		    // Pesquisa do nome do personagem pelo id sorteado, inicializa o array "nome_tamanho" e faz verificações se o nome tem espaço, traço ou acento e transforma o nome em maiúsculo.
		    swapiModule.getPerson(id_personagem, function(data) {
		        var nome = data.name;
		        nome_tamanho = new Array(nome.length);
		        for (var i = 0; i < nome.length; i++) {
		            if (nome.length > 5)
		                if (i == 6)
		                    nome_tamanho[i] = "__";
		                else
		                    nome_tamanho[i] = "__";
		            if (nome.charAt(i) == " ") {
		                nome_tamanho[i] = " ";
		                count++;
		            } else
		            if (nome.charAt(i) == "-") {
		                nome_tamanho[i] = "-";
		                count++;
		            } else
		            if (nome.charAt(i) == "é") {
		                nome[i] = "e";
		            } else
		                nome_tamanho[i] = "__";

		        }
		        var nome = removerAcentos(nome);
		        var nome_person = "'" + nome.toUpperCase() + "'";
		        var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">' + nome_tamanho + '</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" onkeyup="verifica([[NOME]])" style="width:200px;" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/starwars.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		        conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		        $("#form_forca").html(conteudo_forca);
		        document.form_forca.txtLetra.focus(); // Deixa o input sempre selecionado
		    })
		})

		// Função para remover os acentos da palavra.
		function removerAcentos(nome) {
		    var acentos = {
		        a: /[\xE0-\xE6]/g,
		        e: /[\xE8-\xEB]/g,
		        i: /[\xEC-\xEF]/g,
		        o: /[\xF2-\xF6]/g,
		        u: /[\xF9-\xFC]/g,
		        c: /\xE7/g,
		        n: /\xF1/g
		    };

		    for (var letra in acentos) {
		        var expressao = acentos[letra];
		        nome = nome.replace(expressao, letra);
		    }

		    return nome;
		}

		// Função que verifica se o caracter digitado existe na palavra sorteada e verifica se ganhou ou perdeu e da dicas de acordo com a quantidade de erros.
		function verifica(nome) {
		    var letra = $("#inpt_forca").val();
		    letra = letra.toUpperCase();
		    for (var x = 0; x < guarda_char.length; x++) {
		        if (letra == guarda_char[x]) {
		            alert("LETRA JÁ DIGITADA");
		            document.getElementById('inpt_forca').value = '';
		            return;
		        }

		    }
		    guarda_char += letra;
		    errou = 0;

		    for (var i = 0; i < nome.length; i++) {

		        //Se o caracter corresponder com algum caracter do nome sorteado, substitui o "__" para o caracter 
		        if ((nome[i] == letra)) {
		            nome_tamanho[i] = letra;
		            errou = 2;
		            count++;
		            var nome_person = "'" + nome.toUpperCase() + "'";
		            var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">' + nome_tamanho + '</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/starwars.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		            conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		            $("#form_forca").html(conteudo_forca);
		            document.form_forca.txtLetra.focus();
		        } else
		        if (errou != 2)
		            errou = 1;
		    }

		    //Verifica se o jogador ganhou
		    if (count == nome_tamanho.length) {
		        alert("Ganhou!");
		        var conteudo_forca = '<p>PARABÉNS!</p>';
		        $("#form_forca").append(conteudo_forca);
		        $("#inpt_forca").prop('disabled', true);
		    }

		    // contagem de erros
		    if (errou == 1) {
		        alert("Errou ):");
		        qtd_erros += 1;
		        var nome_person = "'" + nome.toUpperCase() + "'";
		        var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">' + nome_tamanho + '</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" name="txtLetra" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/starwars.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		        conteudo_forca = conteudo_forca.replace("[[NOME]]", nome_person);
		        $("#form_forca").html(conteudo_forca);
		        document.form_forca.txtLetra.focus();
		    }

		    // Da as dicas
		    if (qtd_erros == 3) {
		        if (conta_dica == 0) {
		            for (var n = 0; n < nome_tamanho.length; n++) {
		                if (nome_tamanho[n] == "__") {
		                    conta_dica = 1;
		                    var dica = n + 1;
		                    var conteudo_forca = '<br><br><p>Dica: ' + dica + 'ª letra: ' + nome[n] + '</p><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">' + nome_tamanho + '</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" name="txtLetra" type="text" style="width:200px;" onkeyup="verifica([[NOME]])" placeholder=" Letra..."></h2><p style="float:right; margin-right:50px; margin-top:40px;"><img src="img/starwars.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
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

		    //Verifica se o jogador perdeu
		    if (qtd_erros == 6) {
		        alert("Perdeu ):");
		        var nome_person = "'" + nome.toUpperCase() + "'";
		        var conteudo_forca2 = '<p>O personagem era:</p>';
		        var conteudo_forca = '<br><br><p style="margin-left:60px; margin-top:90px; width:10px; float:left;">' + nome + '</p><h2 style="float:left; margin-top:200px;"><input maxlength=1 id="inpt_forca" type="text" style="width:200px;" placeholder=" Letra..." disabled></h2><p style="float:right; margin-right:50px; margin-top:90px;"><img src="img/starwars.png"><br><span style="font-size:30px;">' + qtd_erros + '/6</span></p>';
		        $("#form_forca").html(conteudo_forca);
		        $("#form_forca").append(conteudo_forca2);
		    }
		}

		// ao clicar no "btn_voltar1_quiz2", volta para o menu de entretenimento.
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

		// ao clicar no "btn_voltar2_quiz2", volta para a parte onde digita o nome do segundo quiz
		$("#btn_voltar2_quiz2").on('click', function() {
		    $("#parte2_quiz2").hide();
		    $("#parte3_quiz2").hide();
		    $("#parte4_quiz2").hide();
		    $("#parte5_quiz2").hide();
		    $("#parte6_quiz2").hide();
		    $("#parteX_resultado_quiz2").hide();
		    $("#parte1_quiz2").fadeIn(1500);
		})

		// ao clicar no "btn_voltar3_quiz2", volta para a primeira questão do segundo quiz e diminui a quantidade de acertos obtidos
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

		// ao clicar no "btn_voltar4_quiz2", volta para a segunda questão do segundo quiz e diminui a quantidade de acertos obtidos
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

		// ao clicar no "btn_voltar5_quiz2", volta para a terceira questão do segundo quiz e diminui a quantidade de acertos obtidos
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

		// ao clicar no "btn_voltar6_quiz2", volta para a quarta questão do segundo quiz e diminui a quantidade de acertos obtidos
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

		// ao clicar no "btn_voltar7_quiz2", volta para a quinta questão do segundo quiz e diminui a quantidade de acertos obtidos
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
		    // ao clicar no "btn_voltar3_quiz2", volta para a sexta questão do segundo quiz e diminui a quantidade de acertos obtidos
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

		// ao clicar no "btn_voltar_ent", volta para a o menu de entretenimento
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

		// Guarda o valor do <input type="radio"> dos quizzes
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

		// Exibe a imagem de acordo com o personagem selecionado na pesquisa.
		function imagens(nome) {
		    if (nome == "Yoda")
		        return '<img src="img/Yoda.ico" center>';
		    else if (nome == "Luke Skywalker")
		       return('<img src="img/skywalker.ico" center>');
		    else if (nome == "C-3PO")
		       return('<img src="img/C3PO.png" center>');
		    else if (nome == "R2-D2")
		        return('<img src="img/r2-d2.png" center>');
		    else if (nome == "Darth Vader")
		        return('<img src="img/vader.ico" center>');
		    else if (nome == "Leia Organa")
		       return('<img src="img/Princess_Leia.png" center>');
		    else if (nome == "Ki-Adi-Mundi")
		       return('<img src="img/Ki-Adi-Mundi-icon.png" center>');
		    else if (nome == "Owen Lars")
		      return('<img src="img/Owen_Lars.png" center>');
		    else if (nome == "Beru Whitesun lars")
		      return('<img src="img/lars.png" center>');
		    else if (nome == "R5-D4")
		       return('<img src="img/r5d4.png" center>');
		    else if (nome == "Biggs Darklighter")
		       return('<img src="img/biggs.png" center>');
		    else if (nome == "Obi-Wan Kenobi")
		       return('<img src="img/Obi-wan-kenobi.png" center>');
		    else if (nome == "Anakin Skywalker")
		        return('<img src="img/anakin.png" center>');
		    else if (nome == "Wilhuff Tarkin")
		       return('<img src="img/Tarkin.png" center>');
		    else if (nome == "Chewbacca")
		       return('<img src="img/Chewbacca.ico" center>');
		    else if (nome == "Han Solo")
		       return('<img src="img/han.png" center>');
		    else if (nome == "Greedo")
		      return('<img src="img/Greedo.png" center>');
		    else if (nome == "Jabba Desilijic Tiure")
		       return('<img src="img/Jabba.png" center>');
		    else if (nome == "Wedge Antilles")
		       return('<img src="img/Hellmy.png" center>');
		    else if (nome == "Jek Tono Porkins")
		      return('<img src="img/jek.png" center>');
		    else if (nome == "Palpatine")
		       return('<img src="img/palpa.ico" center>');
		    else if (nome == "Nien Nunb")
		       return('<img src="img/nunb.png" center>');
		    else if (nome == "Wicket Systri Warrick")
		       return('<img src="img/Wicket.png" center>');
		    else if (nome == "Mon Mothma")
		       return('<img src="img/mon.png" center>');
		    else if (nome == "Ackbar")
		      return('<img src="img/Ackbar.png" center>');
		    else if (nome == "Lando Calrissian")
		       return('<img src="img/Lando.png" center>');
		    else if (nome == "Bossk")
		        return('<img src="img/bossk.png" center>');
		    else if (nome == "Boba Fett")
		       return('<img src="img/Boba-Fett-icon.png" center>');
		    else if (nome == "Sebulba")
		       return('<img src="img/Sebulba.png" center>');
		    else if (nome == "Qui-Gon Jinn")
		       return('<img src="img/Qui.png" center>');
		    else if (nome == "Nute Gunray")
		       return('<img src="img/Nute.png" center>');
		    else if (nome == "Finis Valorum")
		       return('<img src="img/valorum.png" center>');
		    else if (nome == "Jar Jar Binks")
		        return('<img src="img/Jar.png" center>');
		    else if (nome == "Roos Tarpals")
		       return('<img src="img/tarpals.png" center>');
		    else if (nome == "Rugor Nass")
		       return('<img src="img/nass.png" center>');
		    else if (nome == "Ric Olié")
		       return('<img src="img/ric.png" center>');
		    else if (nome == "Watto")
		       return('<img src="img/watto.png" center>');
		    else if (nome == "Quarsh Panaka")
		       return('<img src="img/panaka.jpg" center>');
		    else if (nome == "Shmi Skywalker")
		        return('<img src="img/shmi.png" center>');
		    else if (nome == "Darth Maul")
		        return('<img src="img/maul.png" center>');
		    else if (nome == "Bib Fortuna")
		       return('<img src="img/bib.png" center>');
		    else if (nome == "Ayla Secura")
		       return('<img src="img/Aayla.png" center>');
		    else if (nome == "Dud Bolt")
		        return('<img src="img/Dud.jpg" center>');
		    else if (nome == "Gasgano")
		        return('<img src="img/gasgano.png" center>');
		    else if (nome == "Ben Quadinaros")
		        return('<img src="img/ben.png" center>');
		    else if (nome == "Mace Windu")
		        return('<img src="img/windu.png" center>');
		    else if (nome == "Kit Fisto")
		       return('<img src="img/fisto.png" center>');
		    else if (nome == "Eeth Koth")
		       return('<img src="img/koth.png" center>');
		    else if (nome == "Adi Gallia")
		       return('<img src="img/galia.png" center>');
		    else if (nome == "Saesee Tiin")
		        return('<img src="img/tiin.png" center>');
		    else if (nome == "Yarael Poof")
		        return('<img src="img/poof.jpg" center>');
		    else if (nome == "Plo Koon")
		        return('<img src="img/koon.png" center>');
		    else if (nome == "Mas Amedda")
		        return('<img src="img/Amedda.png" center>');
		    else if (nome == "Gregar Typho")
		        return('<img src="img/typho.png" center>');
		    else if (nome == "Cliegg Lars")
		        return('<img src="img/lars2.png" center>');
		    else if (nome == "Poggle the Lesser")
		        return('<img src="img/lesser.png" center>');
		    else if (nome == "Luminara Unduli")
		       return('<img src="img/luminara.jpg" center>');
		    else if (nome == "Barriss Offee")
		       return('<img src="img/barriss.png" center>');
		    else if (nome == "Dooku")
		        return('<img src="img/Dooku.png" center>');
		    else if (nome == "Jango Fett")
		       return('<img src="img/fett.png" center>');
		    else if (nome == "Dexter Jettster")
		        return('<img src="img/dexter.jpg" center>');
		    else if (nome == "Lama Su")
		        return('<img src="img/xx.png" center>');
		    else if (nome == "Taun We")
		        return('<img src="img/xx.png" center>');
		    else if (nome == "Jocasta Nu")
		        return('<img src="img/jocasta.png" center>');
		    else if (nome == "Ratts Tyerell")
		        return('<img src="img/rats.png" center>');
		    else if (nome == "R4-P17")
		        return('<img src="img/r2.jpg" center>');
		    else if (nome == "Wat Tambor")
		        return('<img src="img/wat.png" center>');
		    else if (nome == "San Hill")
		        return('<img src="img/hill.png" center>');
		    else if (nome == "Shaak Ti")
		        return('<img src="img/shaak.png" center>');
		    else if (nome == "Tarfful")
		       return('<img src="img/Tarrful.png" center>');
		    else if (nome == "Tion Medon")
		       return('<img src="img/Pauan.png" center>');
		    else if (nome == "BB8")
		      return('<img src="img/bb8.png" center>');
		    else if (nome == "Padmé Amidala")
		       return('<img src="img/padme.png" center>');
		   else
		   		return('<img src="img/default.png" center>');
		}