if("undefined"==typeof jQuery)throw new Error("Mokki Editor requires jQuery");
var Mokki       = Mokki || {};
var MokkiObject = new Object();
var MokkiImageList = new Array;
var MokkiSaveSelection, MokkiRestoreSelection, MokkiSavedSelection;;
Mokki = {
    editor: function(mokkiElement, mokkiAdditional) {
        document.execCommand('defaultParagraphSeparator', false, 'p');
        MokkiObject.embedArea       = $(mokkiElement).find('#mokkiTextEmbed');
        MokkiObject.placeholder     = (undefined !== MokkiObject.embedArea.attr('placeholder')) ? '<span class="MokkiPlaceholder">'+MokkiObject.embedArea.attr('placeholder')+'</span>' : '';
        var defaultText = (MokkiObject.embedArea.text() !== '' ) ? MokkiObject.embedArea.text() : MokkiObject.placeholder ;
        MokkiObject.embedArea.before('<div id="mokkiTextPreview" contenteditable="true">'+defaultText+'</div>').hide();
        MokkiObject.previewArea     = $(mokkiElement+' #mokkiTextPreview');
        MokkiObject.previewArea.before('<div class="mokkiButtonBar" id="mokkiButtonBar"></div>');
        MokkiObject.buttonBar       = $(mokkiElement+' #mokkiButtonBar');
        Mokki.events.focused();
        var buttonList = (''
                +'<div class="mokki-btn mokki-dropdown" href="#"><i class="fa fa-youtube-play"></i></i>'
                    +'<ul class="align-left">'
                        +'<li><div class="mokki-form-area"><textarea type="text" class="mokki-form" id="mokki-embed-input" placeholder="Embed video here"></textarea> <button class="mokki-cmd mokki-form-btn" data-command="insertEmbed">Embed Video</button></div></li>'
                    +'</ul>'
                +'</div>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertImage"><i class="fa fa-file-image-o"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="bold"><i class="fa fa-bold"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="italic"><i class="fa fa-italic"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="underline"><i class="fa fa-underline"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="strikethrough"><i class="fa fa-strikethrough"></i></a>'
                +'<div class="mokki-btn mokki-cmd mokki-dropdown" href="#"><i class="fa fa-align-center"></i>'
                    +'<ul>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="justifyleft"><i class="fa fa-align-left"></i></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="justifycenter"><i class="fa fa-align-center"></i></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="justifyfull"><i class="fa fa-align-justify"></i></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="justifyright"><i class="fa fa-align-right"></i></a></li>'
                    +'</ul>'
                +'</div>'
                +'<div class="mokki-btn mokki-cmd mokki-dropdown" href="#"><i class="fa fa-paragraph"></i>'
                    +'<ul class="align-left">'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="n">Normal</li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="p">Paragraph</a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="pre">Code</a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="blockquote">Quote</a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h1"><h1 class="heading">Heading 1</h1></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h2"><h2 class="heading">Heading 2</h2></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h3"><h3 class="heading">Heading 3</h3></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h4"><h4 class="heading">Heading 4</h4></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h5"><h5 class="heading">Heading 5</h5></a></li>'
                        +'<li><a class="mokki-btn mokki-cmd" href="#" data-command="formatblock" data-value="h6"><h6 class="heading">Heading 6</h6></a></li>'
                    +'</ul>'
                +'</div>'
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="outdent"><i class="fa fa-outdent"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="indent"><i class="fa fa-indent"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertLink"><i class="fa fa-link"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="unlink"><i class="fa fa-unlink"></i></a>'
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="removeFormat"><i class="fa fa-eraser"></i></a> '
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertorderedlist"><i class="fa fa-list-ol"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="insertunorderedlist"><i class="fa fa-list-ul"></i></a>'
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="subscript"><i class="fa fa-subscript"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="superscript"><i class="fa fa-superscript"></i></a>'
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="undo"><i class="fa fa-rotate-left"></i></a>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="redo"><i class="fa fa-rotate-right"></i></a>'
                +'<span class="sparator"></span>'
                +'<a class="mokki-btn mokki-cmd" href="#" data-command="viewsource"><i class="fa fa-code"></i></a>'
            );
        MokkiObject.previewArea.on('input',function() {
            if (MokkiObject.previewArea.html() !== MokkiObject.embedArea.html()) {
                MokkiObject.embedArea.html(MokkiObject.previewArea.html());
            };
        });
        MokkiObject.buttonBar.html(buttonList);
        MokkiObject.dropDown        = $(mokkiElement+' .mokki-dropdown');
        MokkiObject.buttonBar.button= MokkiObject.buttonBar.find('.mokki-cmd');
        MokkiObject.dropDown.on('mouseover',  function() {
            $(this).find('ul').show();
        }).on('mouseout', function () {
            $(this).find('ul').hide();
        });
        MokkiObject.dropDown.find('.mokki-form').on('click', function (e) {
            e.stopPropagation();
        })
        var embedHtml = $('#mokki-embed-input');
        embedHtml.on('mousedown', function(e){
           MokkiSavedSelection = MokkiSaveSelection( document.getElementById("mokkiTextPreview") );
        });
        MokkiObject.buttonBar.button.on('click', function (e) {
            var command = $(this).attr('data-command');
            console.log(command);
            var value   = $(this).attr('data-value');
            if (command !== "undefined" &&   command !== undefined ) {
                switch (command) {
                    case 'insertLink':
                        var URL = prompt("Enter a URL:", "http://");
                        if ((URL !== null) && (URL !== "")) {
                            Mokki.events.createStyle('CreateLink', URL);
                        }
                    break;

                    case 'insertImage':
                        // var image = prompt("Enter a image location:", "http://");
                        // if ((image !== null) && (image !== "")) {
                        //    Mokki.events.createStyle('InsertImage', image);
                        // }
                        MokkiObject.media = $(mokkiElement+' .mokkiMedia');
                        MokkiObject.media.area =  MokkiObject.media.find('.mokkiMediaArea');
                        Mokki.events.openMedia();
                    break;

                    case 'insertEmbed':
                        if ((embedHtml.val() !== null) && (embedHtml.val() !== "")) {
                           Mokki.events.createStyle('InsertHtml', embedHtml.val());
                            embedHtml.val('');
                        }
                    break;

                    case 'viewsource':
                        Mokki.events.cleanPlaceholder();
                        $(this).attr('data-command', 'hidesource');
                        $(this).addClass('mokki-btn-active')
                        MokkiObject.embedArea.html(MokkiObject.previewArea.html()).show().height(MokkiObject.previewArea.height());
                        MokkiObject.previewArea.hide();
                    break;

                    case 'hidesource':
                        $(this).attr('data-command', 'viewsource');
                        $(this).removeClass('mokki-btn-active');
                        MokkiObject.previewArea.html(MokkiObject.embedArea.val())
                        MokkiObject.embedArea.hide();
                        if (MokkiObject.embedArea.val() == '') {
                            MokkiObject.previewArea.html(MokkiObject.placeholder);
                        }
                        MokkiObject.previewArea.show();
                    break;

                    default:
                        Mokki.events.createStyle(command, value);
                    break;
                }
            }
        });
        if (mokkiAdditional) {
            MokkiObject.config = mokkiAdditional;
            if (MokkiObject.config['colorGlobal']) {
                MokkiObject.buttonBar.find('.mokki-btn').css({'color' : MokkiObject.config['colorGlobal'], });
                MokkiObject.buttonBar.find('.mokki-btn').on('mouseover', function () {
                    $(this).css({'background':MokkiObject.config['colorGlobal']});
                }).on('mouseout', function () {
                    $(this).css({'background':'#fff'});
                });
            }
        }
    }
}

Mokki.events = {
    focused: function () {
        MokkiObject.previewArea.on('focus', function() {
            if ($(this).html() == MokkiObject.placeholder) $(this).html('');
        }).focusout(function() {
            if (!$(this).html().length) $(this).html(MokkiObject.placeholder);
        });
    },
    createStyle: function(command, commandValue) {
        if (MokkiSavedSelection) {
            MokkiRestoreSelection(document.getElementById("mokkiTextPreview"), MokkiSavedSelection);
        }
        Mokki.events.cleanPlaceholder();
        MokkiObject.previewArea.focus();
        // if ('InsertImage' == command) {
        //     document.execCommand(enableObjectResizing, false, commandValue);
        // };
        document.execCommand(command, false, commandValue);
    },
    cleanPlaceholder : function () {
        if ( MokkiObject.previewArea.html() == MokkiObject.placeholder)  return MokkiObject.previewArea.html('');
    },
    openMedia : function () {
        MokkiObject.media.fadeIn('fast', function () {
            MokkiObject.media.area.find('.mokkiCloseMedia').on('click', function () {
                Mokki.events.closeMedia();
            });
            MokkiObject.media.area.uploaderBar = MokkiObject.media.area.find('.mokkiTabs .mediaUploaderBar');
            MokkiObject.media.area.find('.mokkiTabs ul li:first-child').addClass('active')
            MokkiObject.media.area.find('.mokkiTabs .mediaUploaderBar#1').show();
            MokkiObject.media.area.find('.mokkiTabs ul li').on('click', function () {
                MokkiObject.media.area.find('.mokkiTabs ul li').removeClass('active')
                $(this).addClass('active');
                MokkiObject.media.find('.mokkiTabsContainer').hide();
                MokkiObject.media.area.uploaderBar.hide();
                MokkiObject.media.find('.mokkiTabsContainer#'+$(this).attr('data-tabs')).show();
                var MokkiUploadBar = MokkiObject.media.area.find('.mokkiTabs .mediaUploaderBar#'+$(this).attr('data-tabs'));
                if (MokkiUploadBar.length) {
                    MokkiUploadBar.show();
                }
                else{
                      MokkiObject.media.find('.mokkiTabsContainer#'+$(this).attr('data-tabs')).height(Mokki.events.sizeMediaHeight('tabs') + 65);
                }
            });
            MokkiObject.media.area.tabsUl = MokkiObject.media.area.find('.mokkiTabs ul');
            MokkiObject.media.area.containerSection = MokkiObject.media.area.find('.mokkiTabs .mokkiTabContainerSection');
            MokkiObject.media.area.container = MokkiObject.media.find('.mokkiMediaContent');
            MokkiObject.media.area.containerSection.width( Mokki.events.sizeMediaWidth() );
            MokkiObject.media.area.uploaderBar.width( Mokki.events.sizeMediaWidth() );
            MokkiObject.media.area.container.height(Mokki.events.sizeMediaHeight());
            MokkiObject.media.find('.mokkiTabsContainer').height(Mokki.events.sizeMediaHeight('tabs'))
            window.onresize = function () {
                MokkiObject.media.area.container.height(Mokki.events.sizeMediaHeight());
                MokkiObject.media.find('.mokkiTabsContainer').height(Mokki.events.sizeMediaHeight('tabs'))
                MokkiObject.media.area.containerSection.width( Mokki.events.sizeMediaWidth() );
                MokkiObject.media.area.uploaderBar.width( Mokki.events.sizeMediaWidth() );
            }
            MokkiObject.media.find('.mokkiTabsContainer#1').show(function () {
                $(this).find('.mediaList').html('<div class="mediaItems" data-url="http://localhost/2014_newmulia/public/img/users/1.jpg"><div class="spanIcon"><i class="fa fa-picture-o"></i> Loading </div></div><div class="mediaItems" data-url="http://localhost/2014_newmulia/public/img/users/2.jpg"><div class="spanIcon"><i class="fa fa-picture-o"></i> Loading </div></div>');
                MokkiObject.media.find('.mediaItems').on('click', function(){
                    $(this).toggleClass('mediaActive');
                    if (MokkiImageList.indexOf($(this).attr('data-url')) > -1) {
                        var MokkiImageListPosition = $.inArray($(this).attr('data-url'), MokkiImageList);
                        MokkiImageList.splice(MokkiImageListPosition, 1);
                    }
                    else{
                        MokkiImageList.push($(this).attr('data-url'));
                    }
                    if (MokkiObject.media.find('.mediaActive').length > 0) {
                        MokkiObject.media.find('.mokkiAddSelected').attr('disabled', false);
                    }
                    else{
                        MokkiObject.media.find('.mokkiAddSelected').attr('disabled', true);
                    }
                });
                MokkiObject.media.find('.mokkiAddSelected').unbind("click").on('click', function() {
                    Mokki.events.insertImageToEditor();
                })
            })
        });
    },
    closeMedia : function () {
        MokkiObject.media.fadeOut('fast', function () {
            $(this).find('.mediaList').html('');
            MokkiObject.media.area.find('.mokkiTabs ul li').removeClass('active')
            MokkiObject.media.find('.mokkiTabsContainer').hide();
            MokkiObject.media.find('.mokkiAddSelected').attr('disabled', true);
            // MokkiObject.media.find('.mediaItems').removeClass('mediaActive');
            MokkiImageList = new Array;
        });
    },
    sizeMediaHeight : function (el) {
        switch (el) {
            case 'tabs':
                return  Mokki.events.sizeMediaHeight() - 65;
            break;

            default:
                return MokkiObject.media.area.height() - MokkiObject.media.area.find('.mokkiMediaHeader').height() - 20;
            break;
        }

    },
    sizeMediaWidth : function () {
        return MokkiObject.media.area.width() - MokkiObject.media.area.tabsUl.width() - 16 ;
    },
    insertImageToEditor : function () {
        if (MokkiImageList.length > 0 ) {
            for (var i = 0; i < MokkiImageList.length; i++) {
                console.log('ke : '+i);
                Mokki.events.createStyle('InsertImage', MokkiImageList[i]);
            }
        }
        else{
            alert('Please select an image');
        }
    }
}

if (window.getSelection && document.createRange) {
    MokkiSaveSelection = function(containerEl) {
        var range = window.getSelection().getRangeAt(0);
        var preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        var start = preSelectionRange.toString().length;

        return {
            start: start,
            end: start + range.toString().length
        }
    };

    MokkiRestoreSelection = function(containerEl, savedSel) {
        var charIndex = 0, range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        var nodeStack = [containerEl], node, foundStart = false, stop = false;

        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                var nextCharIndex = charIndex + node.length;
                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            } else {
                var i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
} else if (document.selection && document.body.createTextRange) {
    MokkiSaveSelection = function(containerEl) {
        var selectedTextRange = document.selection.createRange();
        var preSelectionTextRange = document.body.createTextRange();
        preSelectionTextRange.moveToElementText(containerEl);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
        var start = preSelectionTextRange.text.length;

        return {
            start: start,
            end: start + selectedTextRange.text.length
        }
    };

    MokkiRestoreSelection = function(containerEl, savedSel) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", savedSel.end);
        textRange.moveStart("character", savedSel.start);
        textRange.select();
    };
}
