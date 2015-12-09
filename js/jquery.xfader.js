// JavaScript jQuery Plugin xFader - Alexandre Mattos
(function(){
	
	//Definicao do nome do plugin e chamada com opcoes
	jQuery.fn.xFader = function(options){	
	
		//Seta os valores default
		var defaults = {
			auto:true, // ( true ) muda a imagem automaticamente / ( false ) muda somente atraves do controle
			duration:10000, // duracao em milisegundos para troca automatica, necessita de auto:true
			showControls: false, // ( false ) por default vem desabilitado / ( true ) habilita os controles
			control: 2 // ( 1 ) controle vertical / ( 2 ) controle horizontal
		}
		
		var options =  $.extend(defaults, options);
		
		//Inicializacao do plugin
		return this.each(function(){
			
			//Objeto
			var obj = jQuery(this);
			
			//Itens
			var itens = obj.find('li');
			
			//Quantidade de Itens
			var qtdItens = itens.size();
		
			//Se tiver mais de 1 item
			if ( qtdItens > 1 ) {
				
				//Esconde todos os itens
				itens.hide();
				
				//Anima o primeiro
				itens.eq(0).fadeIn('300');
				
				//Cria o controle de loop
				var x=0;
				
				//Criacao dos controles
				stringCreation = '<div class="controls">';
				while( x < qtdItens ) {
					stringCreation += '<a href="javascript:void(0);" rel="'+x+'" class="faderBtn"></a>';
					x++;
				}
				stringCreation = stringCreation + '</div>';
				
				//Joga no html o controle pronto
				obj.append(stringCreation);
				
				//Adiciona o primeiro item a classe selecionada
				obj.find('.controls a:first').addClass('selected');
				
				//Cria a funcao de clique para os controles
				obj.find('.controls a').live('click',function(){
				
					//Se o item clicado ja tiver sido selecionado
					if ( !jQuery(this).hasClass('selected') ){ 
						
						//Resgata o valor do rel do botao
						var rel = jQuery(this).attr('rel');
						
						//Remove a classe Selected do item
						jQuery(this).parent().find('a').removeClass('selected');
						
						//Faz a animacao escondendo os itens
						itens.fadeOut('300');
						
						//Faz a animacao mostrando os novos itens
						itens.eq(rel).fadeIn('300');
						
						//Adiciona a classe selecionada para o botao clicado
						jQuery(this).addClass('selected');
					}
					
				});
				
				//Cria a variavel para manipulacao do controle
				var control = obj.find('.controls');
				
				
				if ( options.control == 1 ) {
					
					// Controle Vertical
					control.css({'width':'10px'});
					
					//Adiciona a altura para alinhar
					var controlsheight = obj.find('.controls').height();
					
					control.css({
						'margin-top':'-' + ( (controlsheight / 2) - 3 ) + 'px',
						'top':'50%',
						'right':'10px'
					});
					
					control.find('a').css({
						'display':'block',
						'margin':'2px 0'
					});
					
				}else if ( options.control = 2 ) {
					
					// Controle Horizontal
					control.css({'height':'10px'});
					
					//Adiciona a altura para alinhar
					var controlswidth = obj.find('.controls').width();
					
					control.css({
						'margin-left':'-' + ( (controlswidth / 2) - 3 ) + 'px',
						'left':'50%',
						'bottom':'10px'
					});
					
					control.find('a').css({
						'display':'block',
						'margin':'0 2px'
					});
				
				}
				
			}

			//Funcao de auto loop
			if ( options.auto == true ) {
				
				//Controle para pausar a mudanca automatica enquanto passa o mouse em cima dos itens
				var mboxover = 1; // ( 1 ) para habilitar / ( 0 ) para desabilitar
				
				obj.bind('mouseover',function(){
					mboxover = 0; //Mouse em cima desabilita
				}).bind('mouseout',function(){
					mboxover = 1; //Mouse fora do item habilita
				});
				
				//Cria um intervalo de tempo para mudar de imagem
				var t = setInterval(function(){
	
					//Pega o item atual
					var atual = parseInt(obj.find('.controls a.selected').attr('rel')) + 1;
						
					if ( mboxover == 1 ) {
						//Quando chegar ao final joga para o primeiro
						if ( atual >= qtdItens){
							obj.find('.controls a:first').click();	
						}else{
							obj.find('.controls a').eq(atual).click();
						}	
					}
					
				},options.duration);
				
			}
			
			if ( options.auto == true ) {
				if ( options.showControls == false ) {
					control.hide();	
				}else if ( options.showControls == true ) {
					control.show();
				}
			}else{
				control.show();
			}
			
		}); //Fim do processo
	
	}	
	
})(jQuery);