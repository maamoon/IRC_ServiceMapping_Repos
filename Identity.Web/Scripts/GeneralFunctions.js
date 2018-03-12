jQuery( function ( $ )
{

    // $( '.date-picker' ).datepicker( {
    //     autoclose: true,
    //     todayHighlight: true,
    //     dateFormat: 'dd/MM/yyyy'
    // } )

    ////show datepicker when clicking on the icon
    //.next().on( ace.click_event, function ()
    //{
    //    $( this ).prev().focus();
    //} );

    $( 'body' ).on( 'click', '.modal-link', function ( e )
    {
        e.preventDefault();
        $( this ).attr( 'data-target', '#modal-container' );
        $( this ).attr( 'data-toggle', 'modal' );
        $( '#modal-container' ).width( _DialogWidth );
        $( '#modal-container' ).height( _DialogHeight );

    } );

    $( 'body' ).on( 'click', '.modal-close-btn', function ( e )
    {
        $( '#modal-container' ).modal( 'hide' );
    } );

    $( 'body' ).on( 'click', '.modal-link', function ( e )
    {
        $( this ).removeData( 'bs.modal' );
    } );

    $( '.modal-dialog' ).one( 'appear', function ()
    {
        alert( 'The element has appeared on the screen.' );
    } );

    $.fn.serializeObject = function ()
    {
        var o = {};
        var a = this.serializeArray();
        $.each( a, function ()
        {
            if ( o[this.name] )
            {
                if ( !o[this.name].push )
                {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push( this.value || '' );
            } else
            {
                o[this.name] = this.value || '';
            }
        } );
        return o;
    };
    $( '[data-toggle="tooltip"]' ).tooltip();
    //Grid settings 

    //END Grid Settings 
} );

function PreviewFile( filePath )
{
    if ( filePath != null && filePath != '' )
    {
        window.open(
       filePath,
       '_blank'
     );
    }

}
var displayDivID1 = '';
var lblImageName1 = '';
function UploadAndDisplayImage( $this, e, FolderAndFileName, displayDivID, lblImageName )
{

    e.preventDefault();
    var link = _RootName + 'Manage/ChangePicturePost';
    var file = $this.files[0];
    var formData = new FormData();
    displayDivID = $( $this ).closest( 'tr' ).find( 'img' ).attr( 'id' );
    formData.append( FolderAndFileName, file, FolderAndFileName );
    displayDivID1 = displayDivID;
    lblImageName1 = lblImageName;
    $.ajax( {
        url: link,
        data: formData,
        type: 'POST',
        // THIS MUST BE DONE FOR FILE UPLOADING
        contentType: false,
        processData: false,
        success: function ( data )
        {

            $( '#ProfilePicture' ).attr( 'src', data.filePath )
            //$( '#DocPath' ).text( data.filePath );
            //$( '#DocPath' ).val( data.filePath );
        }
    } )

}
function UploadAndDisplayImage1( $this, e, FieldName, displayDivID, lblImageName )
{
    debugger;
    e.preventDefault();
    var link = _RootName + 'GeneralFunctions/DisplayUplaodedImage';
    var file = $this.files[0];
    name = file.name;
    size = file.size;
    fileType = file.type;
    if ( $.inArray( fileType, imageTypes ) < 0 )
    {
        CustomAlert( "الرجاء اختيار صورة", "امتداد ملف خاطىء", BootstrapDialog.TYPE_SUCCESS, function () { } );
        $this.files[0] = null;
    }
    else
    {
        var formData = new FormData();
        formData.append( FieldName, $this.files[0] );

        $.ajax( {
            url: link,
            data: formData,
            type: 'POST',
            // THIS MUST BE DONE FOR FILE UPLOADING
            contentType: false,
            processData: false,
            success: function ( data )
            {
                debugger;
                $( '#' + displayDivID ).attr( 'src', data.filePath )
                $( '#' + lblImageName ).text( data.filePath );
                $( '#' + lblImageName ).val( data.filePath );
            }

        } )

    }

}

var DWObject;
var isScannerConnected = false;
function Dynamsoft_OnReady()
{

    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain( 'dwtcontrolContainer' ); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'

    if ( DWObject )
    {

        var count = DWObject.SourceCount; // Populate how many sources are installed in the system
        if ( count == 0 && Dynamsoft.Lib.env.bMac )
        {
            DWObject.CloseSourceManager();
            DWObject.ImageCaptureDriverType = 0;
            DWObject.OpenSourceManager();
            count = DWObject.SourceCount;
        }
        debugger;
        //  DWObject.SelectSourceByIndex(1);
        for ( var i = 0; i < count; i++ )
        {

            if ( DWObject.GetSourceNameItems( i ).indexOf( "WIA" ) !== -1 )
            {

                DWObject.SelectSourceByIndex( i );
                isScannerConnected = true;
                break;
            }
            else
            {
                isScannerConnected = false;
            }
        }

        $( "#dwtcontrolContainer" ).hide();
    }
    $( "#dwtcontrolContainer" ).hide();
    DWObject.RegisterEvent( "OnPostTransfer", Dynamsoft_OnPostTransfer );
}
var _displayDivID, _lblImageName = '';

function AcquireImage( displayDivID, lblImageName )
{
    if ( DWObject )
    {
        _displayDivID = displayDivID;
        _lblImageName = lblImageName;

        //DWObject.SelectSourceByIndex( 1 );

        DWObject.OpenSource();
        DWObject.IfShowUI = true;// document.getElementById( "ShowUI" ).checked;
        DWObject.IfDisableSourceAfterAcquire = true;  //Scanner source will be disabled/closed automatically after the scan.
        DWObject.AcquireImage();
        if ( !isScannerConnected )
        {
            alert( "الرجاء ايصال جهاز الماسح الضوئي للجهاز والمحاولة مرة اخرى" );
            return;
        }

        var OnAcquireImageSuccess, OnAcquireImageFailure;
        OnAcquireImageFailure = function ()
        {
        }
        OnAcquireImageSuccess = function ()
        {

            debugger;
            //  Dynamsoft_OnPostTransfer()

        };


    }
}

function Dynamsoft_OnPostTransfer()
{
    debugger;
    var strHostIP = location.host;
    DWObject.HTTPUploadThroughPost( strHostIP,
        DWObject.CurrentImageIndexInBuffer,
         '/Akeed/GeneralFunctions/DisplayScannedImage',
        "imageData.jpeg",
        OnHttpUploadSuccess,
          OnHttpUploadFailure );
    if ( DWObject.ErrorCode != 0 )
    {  //Failed to upload image
        alert( DWObject.ErrorString );
    }


}
//Callback functions for async APIs
function OnHttpUploadSuccess()
{
    debugger;
    console.log( 'successful' );


}
function OnHttpUploadFailure( errorCode, errorString, data )
{
    debugger;
    data = JSON.parse( data );
    $( '#' + _displayDivID ).attr( 'src', data.filePath )
    $( '#' + _lblImageName ).text( data.filePath );
    $( '#' + _lblImageName ).val( data.filePath );

}

function DoRefrech( gridCountrol )
{
    $( '#' + gridCountrol ).trigger( 'reloadGrid' );
}

function guid()
{
    function s4()
    {
        return Math.floor(( 1 + Math.random() ) * 0x10000 )
          .toString( 16 )
          .substring( 1 );
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function goToView( actionName, controllerName, QueryString )
{
    ShowHideAjaxLoader( true );
    window.location.href = _RootName + ( !controllerName ? _ControllerName : controllerName ) + "/" + actionName + ( !QueryString ? "" : "?" + QueryString );
}

function ShowDialog( ControllerName, ActionName, callBack, width, height, Title, queryString, modalId )
{
    ShowHideAjaxLoader( true );
    var pageToLoad = _RootName + ControllerName + '/' + ActionName;
    if ( queryString != '' && queryString != undefined )
    {
        pageToLoad += queryString;
    }
    BootstrapDialog.show( {
        title: Title,
        message: function ( dialog )
        {
            var $message = $( '<div></div>' );
            var pageToLoad = dialog.getData( 'pageToLoad' );
            $message.load( pageToLoad );
            dialog.$modalDialog.attr( "id", modalId );
            dialog.$modalDialog.width( width );
            dialog.$modalDialog.height( height );
            return $message;
        },
        data: {
            'pageToLoad': pageToLoad,
        },
        callback: callBack
    } );
    ShowHideAjaxLoader( false );
}

function ShowMessage( messgeText, callBack, title )
{
    bootbox.confirm( {
        title: title,
        message: messgeText,
        buttons: {
            confirm: {
                label: "Ok",
                className: "btn-primary btn-sm",
            },
            cancel: {
                label: CancelText,
                className: "btn-sm",
            }
        },
        callback: callBack
    } );
}

function CustomAlert( message, alertTitle, alertType, callback, alertId )
{
    //Alert Type should be one of the below values
    //BootstrapDialog.TYPE_DEFAULT, BootstrapDialog.TYPE_INFO, BootstrapDialog.TYPE_PRIMARY, BootstrapDialog.TYPE_SUCCESS, BootstrapDialog.TYPE_WARNING, BootstrapDialog.TYPE_DANGER
    var dialog = BootstrapDialog.alert( {
        title: alertTitle,
        message: message,
        type: alertType, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        buttonLabel: "Ok", // <-- Default value is 'OK',
        callback: callback
    } );
    dialog.$modalDialog.attr( "id", alertId );
}


function CallAjaxMethod( Action_ControllerName, Data, CallBack, withOutLoader, form )
{

    if ( form != "" && form != undefined )
    {

        var _e = {};
        _e.form = form;

        if ( _e.form.length > 0 )
        {
            _e.url = _e.form.attr( "action" );
        }

        if ( _e.form.length > 0 )
            _e.valid = _e.form.valid();

        if ( !_e.valid ) return false;

    }
    var PostedData;
    if ( Data != null )
    {
        if ( ( typeof ( Data ) ).toString().indexOf( 'object' ) > -1 )
            PostedData = JSON.stringify( Data );
        else
            PostedData = Data;
    }
    if ( !withOutLoader )
        ShowHideAjaxLoader( true );

    var ReturnValue;

    var xhr = $.ajax(
        {
            url: Action_ControllerName, //( Action_ControllerName.indexOf( _RootName ) > -1 ? Action_ControllerName : _RootName + Action_ControllerName ),
            cache: false,
            contentType: "application/json; charset=utf-8",
            data: PostedData,
            async: CallBack == null ? false : true,
            type: "POST",
            success: function ( r )
            {
                if ( r.ErrorMessage == "SystemSessionTimeOut" )
                {
                    location.reload();
                }
                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( CallBack )
                {
                    CallBack.call( this, r );
                }

                else
                {
                    ReturnValue = r;
                }


            },
            error: function ( httpReguest, d, b, c )
            {

                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( httpReguest.statusText.toLowerCase().indexOf( "error" ) > -1 )
                {
                    var json = JSON.parse( httpReguest.responseText );
                    var Message = json.Message;

                    if ( Message == "SystemSessionTimeOut" )
                    {
                        location.reload();
                    }
                    if ( json.RedirectUrl )
                    {
                        window.location = json.RedirectUrl;
                        return;
                    }

                    if ( Message === "SessionLost" )
                    {
                        goToView( "Home", "Index" );
                        return;
                    }
                    if ( Message == "SystemSessionTimeOut" )
                    {
                        location.reload();
                    }
                    ShowMessage( Message, function ()
                    {
                    }, '' );
                    if ( $.isFunction( CallBack ) )
                        CallBack.call( "", -1 );
                }

            }
        }
    );
    return ReturnValue;
}

function CallAjaxMethodwithoutasync( Action_ControllerName, Data, CallBack, withOutLoader, form )
{

    if ( form != "" && form != undefined )
    {

        var _e = {};
        _e.form = form;

        if ( _e.form.length > 0 )
        {
            _e.url = _e.form.attr( "action" );
        }

        if ( _e.form.length > 0 )
            _e.valid = _e.form.valid();

        if ( !_e.valid ) return false;

    }
    var PostedData;
    if ( Data != null )
    {
        if ( ( typeof ( Data ) ).toString().indexOf( 'object' ) > -1 )
            PostedData = JSON.stringify( Data );
        else
            PostedData = Data;
    }
    if ( !withOutLoader )
        ShowHideAjaxLoader( true );

    var ReturnValue;
    var xhr = $.ajax(
        {
            url: ( Action_ControllerName.indexOf( _RootName ) > -1 ? Action_ControllerName : _RootName + Action_ControllerName ),
            cache: false,
            contentType: "application/json; charset=utf-8",
            data: PostedData,
            async: false,
            type: "POST",
            success: function ( r )
            {
                if ( r.ErrorMessage == "SystemSessionTimeOut" )
                {
                    location.reload();
                }
                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( CallBack )
                {
                    CallBack.call( this, r );
                }
                else
                {
                    ReturnValue = r;
                }


            },
            error: function ( httpReguest, d, b, c )
            {
                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( httpReguest.statusText.toLowerCase().indexOf( "error" ) > -1 )
                {
                    var json = JSON.parse( httpReguest.responseText );
                    if ( json.RedirectUrl )
                    {
                        window.location = json.RedirectUrl;
                        return;
                    }
                    var Message = json.Message;
                    if ( Message === "SessionLost" )
                    {
                        goToView( "Home", "Index" );
                        return;
                    }

                    ShowMessage( Message, function ()
                    {
                    }, '' );
                    if ( $.isFunction( CallBack ) )
                        CallBack.call( "", -1 );
                }

            }
        }
    );
    return ReturnValue;
}

function CallTestMethod( Action_ControllerName, Data, CallBack, withOutLoader )
{

    var PostedData;
    if ( Data != null )
    {
        PostedData = Data;
    }
    if ( !withOutLoader )
        ShowHideAjaxLoader( true );

    var ReturnValue;
    var xhr = $.ajax(
        {
            url: ( Action_ControllerName.indexOf( _RootName ) > -1 ? Action_ControllerName : _RootName + Action_ControllerName ),
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: PostedData,
            async: CallBack == null ? false : true,
            type: "POST",
            success: function ( r )
            {
                if ( r.ErrorMessage == "SystemSessionTimeOut" )
                {
                    location.reload();
                }
                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( CallBack )
                {
                    CallBack.call( this, r );
                }
                else
                {
                    ReturnValue = r;
                }


            },
            error: function ( httpReguest, d, b, c )
            {
                if ( !withOutLoader )
                    ShowHideAjaxLoader( false );
                if ( httpReguest.statusText.toLowerCase().indexOf( "error" ) > -1 )
                {
                    var json = JSON.parse( httpReguest.responseText );
                    var Message = json.Message;
                    if ( Message == "SystemSessionTimeOut" )
                    {
                        location.reload();
                    }
                    if ( json.RedirectUrl )
                    {
                        window.location = json.RedirectUrl;
                        return;
                    }

                    if ( Message === "SessionLost" )
                    {
                        goToView( "Home", "Index" );
                        return;
                    }

                    ShowMessage( Message, function ()
                    {
                    }, '' );
                    if ( $.isFunction( CallBack ) )
                        CallBack.call( "", -1 );
                }

            }
        }
    );
    return ReturnValue;
}


function GetGridSelectedRows( JQGrid )
{
    var jasonObject = [];
    if ( !JQGrid[0].p.multiselect )
    {
        var id = JQGrid.getGridParam( "selrow" );
        if ( id != null )
        {
            var row = JQGrid.getRowData( id )
            row.id = id;
            jasonObject.push( row );
        }
        return jasonObject;
    }
    var m = JQGrid.getGridParam( "selarrrow" );

    for ( var i = 0; i < m.length; i++ )
    {
        var s = JQGrid.getRowData( m[i] );
        s.id = m[i];
        jasonObject.push( s );
    }
    return jasonObject;
}



function BindGrid( JQGrid, ActionName, WithSearchHeader, ExtraData )
{
    ShowHideAjaxLoader( true );
    var postData = JQGrid[0].p.postData;
    var _loader = $( "#load_" + JQGrid[0].id ).hide();
    _loader.show();
    var stringPostData = { GridParameters: JSON.stringify( postData ), kok: JSON.stringify( ExtraData ) }
    if ( ExtraData != null )
    {
        if ( typeof ( ExtraData ).toString().indexOf( 'object' ) > -1 )
            stringPostData.ExtraData = JSON.stringify( ExtraData );
        else
            var x = $.extend( stringPostData, ExtraData );
        // stringPostData.ExtraData = ExtraData ;
    }

    CallAjaxMethod( _ControllerName + "/" + ActionName, stringPostData, function ( r )
    {
        JQGrid[0].addJSONData( r );
        //JQGrid.jqGrid('resetSelection');
        _loader.hide();
        ShowHideAjaxLoader( false );
    }, true );
    //var ddl = $(".ui-pg-selbox", JQGrid[0].p.pager);
    //if (ddl.data("selectmenu") != true) {
    //    ddl.selectmenu({ style: 'dropdown' });
    //}
    if ( WithSearchHeader == true )
    {
        if ( !JQGrid[0].p.disableSearch && !JQGrid[0].nav && !JQGrid[0].ftoolbar )
        {
            //JQGrid.jqGrid('navGrid', JQGrid[0].p.pager,
            // { edit: false, add: false, del: false },
            // {},
            // {},
            // {},
            // { multipleSearch: true, multipleGroup: true }
            // );
            JQGrid.jqGrid( 'filterToolbar', { stringResult: true } );
        }
    }

}

function BindGridWithController( JQGrid, ActionName, ControllerName, WithSearchHeader, ExtraData )
{
    debugger;
    ShowHideAjaxLoader( true );
    var postData = JQGrid[0].p.postData;
    if ( typeof postData.filters !== "undefined" )
    {
        postData.filters = "";
    }
    var _loader = $( "#load_" + JQGrid[0].id ).hide();
    _loader.show();
    var stringPostData = { reqGridParameters: JSON.stringify( postData ), reqMainDataRequest: JSON.stringify( ExtraData ) }
    //if ( ExtraData != null )
    //{
    //    if ( typeof ( ExtraData ).toString().indexOf( 'object' ) > -1 )
    //        stringPostData.ExtraData = JSON.stringify( ExtraData );
    //    else
    //        var x = $.extend( stringPostData, ExtraData );
    //    // stringPostData.ExtraData = ExtraData ;
    //}
    var returnedData = [];
    CallAjaxMethod( ControllerName + "/" + ActionName, stringPostData, function ( H )
    {
        debugger;
        if ( jQuery.type( H ) === "string" )
        {
            if ( H.length > 100 )
            {
                H = JSON.parse( H );

            }
            else
                H = [];

        }

        JQGrid[0].addJSONData( H );
        returnedData = H;
        // JQGrid.jqGrid( 'resetSelection' );
        _loader.hide();
        ShowHideAjaxLoader( false );
    }, true );
    //var ddl = $(".ui-pg-selbox", JQGrid[0].p.pager);
    //if (ddl.data("selectmenu") != true) {
    //    ddl.selectmenu({ style: 'dropdown' });
    //}
    if ( WithSearchHeader == true )
    {
        if ( !JQGrid[0].p.disableSearch && !JQGrid[0].nav && !JQGrid[0].ftoolbar )
        {

            //JQGrid.jqGrid('navGrid', JQGrid[0].p.pager,
            // { edit: false, add: false, del: false },
            // {},
            // {},
            // {},
            // { multipleSearch: true, multipleGroup: true }
            // );
            JQGrid.jqGrid( 'filterToolbar', { stringResult: true } );
        }
    }
    return returnedData;
}

function BindDetailsGrid( $grid, Json )
{

    if ( Json == -1 || Json == null )
    {

        $grid.clearGridData();
    }
    var grid = $grid[0];
    var gridjson = {};
    gridjson.rows = GetJsonGrid( Json, grid.p.colModel );
    gridjson.records = Json.length;
    gridjson.total = ( Json.RowsCount > 0 ? Math.ceil( Json.length / Json.MaximumRows ) : 1 );
    gridjson.page = parseInt(( Json.StartRowIndex ) / ( grid.p.rowNum ) + 1 );

    if ( grid.p.loadonce == true )
        grid.p.rowNum = gridjson.records;

    if ( gridjson.page > gridjson.total )
    {
        $grid.setGridParam( { page: gridjson.total } ).trigger( "reloadGrid" );
    }
    else
        grid.addJSONData( gridjson );

}

function GetJsonGrid( json, gridCols )
{
    json = CheckArray( json );
    var cells = [];
    for ( var row in json )
    {
        var obj = [];
        var id;
        for ( var datafield in gridCols )
        {
            if ( gridCols[datafield].name !== 'cb' && gridCols[datafield].name !== 'subgrid' && gridCols[datafield].name !== 'rn' )
            {
                if ( gridCols[datafield].PK ) id = json[row][gridCols[datafield].name];
                value = json[row][gridCols[datafield].name];
                obj.push( value );
                //obj.push(CheckDateFormat(value));
            }
        }
        cells.push( { cell: obj, id: id } );
    }
    return cells;
}

///<gridName> the name of jqGrid</gridName>
///<parentColumn> parent column class </parentColumn> for example: $(gridName).closest('[class*="col-"]');
function ResizeGrid( gridName, gridPager, parentColumn )
{
    //trigger window resize to make the grid get the correct size

    //resize to fit page size
    $( window ).on( 'resize.jqGrid', function ()
    {
        $( gridName ).jqGrid( 'setGridWidth', parentColumn.width() - 50 );
    } )

    //resize on sidebar collapse/expand
    $( document ).on( 'settings.ace.jqGrid', function ( ev, event_name, collapsed )
    {
        if ( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' )
        {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout( function ()
            {
                $( gridName ).jqGrid( 'setGridWidth', parentColumn.width() - 50 );
            }, 0 );
        }
    } );

}
function JQGridPagerSettings( gridName, gridPager, edit, add, del, search, refresh )
{

    jQuery( gridName ).jqGrid( 'navGrid', gridPager,
            { 	//navbar options
                edit: true,
                editicon: 'ace-icon fa fa-pencil blue',
                add: true,
                addicon: 'ace-icon fa fa-plus-circle purple',
                del: true,
                delicon: 'ace-icon fa fa-trash-o red',
                search: true,
                searchicon: 'ace-icon fa fa-search orange',
                refresh: true,
                refreshicon: 'ace-icon fa fa-refresh green',
                view: true,
                viewicon: 'ace-icon fa fa-search-plus grey',
            },
            {
                //edit record form
                //closeAfterEdit: true,
                //width: 700,
                recreateForm: true,
                beforeShowForm: function ( e )
                {
                    var form = $( e[0] );
                    form.closest( '.ui-jqdialog' ).find( '.ui-jqdialog-titlebar' ).wrapInner( '<div class="widget-header" />' )
                    style_edit_form( form );
                }
            },
            {
                //new record form
                //width: 700,
                closeAfterAdd: true,
                recreateForm: true,
                viewPagerButtons: false,
                beforeShowForm: function ( e )
                {
                    var form = $( e[0] );
                    form.closest( '.ui-jqdialog' ).find( '.ui-jqdialog-titlebar' )
                    .wrapInner( '<div class="widget-header" />' )
                    style_edit_form( form );
                }
            },
            {
                //delete record form
                recreateForm: true,
                beforeShowForm: function ( e )
                {
                    var form = $( e[0] );
                    if ( form.data( 'styled' ) ) return false;

                    form.closest( '.ui-jqdialog' ).find( '.ui-jqdialog-titlebar' ).wrapInner( '<div class="widget-header" />' )
                    style_delete_form( form );

                    form.data( 'styled', true );
                },
                onClick: function ( e )
                {
                    //alert(1);
                }
            },
            {
                //search form
                recreateForm: true,
                afterShowSearch: function ( e )
                {
                    var form = $( e[0] );
                    form.closest( '.ui-jqdialog' ).find( '.ui-jqdialog-title' ).wrap( '<div class="widget-header" />' )
                    style_search_form( form );
                },
                afterRedraw: function ()
                {
                    style_search_filters( $( this ) );
                }
                ,
                multipleSearch: true,
                /**
                multipleGroup:true,
                showQuery: true
                */
            },
            {
                //view record form
                recreateForm: true,
                beforeShowForm: function ( e )
                {
                    var form = $( e[0] );
                    form.closest( '.ui-jqdialog' ).find( '.ui-jqdialog-title' ).wrap( '<div class="widget-header" />' )
                }
            }
        )
}

function onPressEnter( obj, e, eventEnter )
{
    if ( e.which == 13 )
    {
        eval( eventEnter );
    }
}
function NumericOnly( evt )
{
    if ( evt.shiftKey )
        return false;
    //alert(evt.keyCode);
    if ( ( ( evt.keyCode >= 48 ) && ( evt.keyCode <= 57 ) ) || ( ( evt.keyCode >= 96 ) && ( evt.keyCode <= 105 ) ) )
        return true;
    else
    {
        if ( evt.keyCode == 17 || evt.keyCode == 86 )
        {
            if ( evt.ctrlKey )
            {
                return true;
            }
        }
        //for allowing backspace (8) and delete(46) and left,right arrow and enter btn hit
        if ( evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 46 || evt.keyCode == 37 || evt.keyCode == 39 || evt.keyCode == 13 || evt.keyCode == 86 )
            return true;
        else
            return false;
    }
}
function AlphabetsOnly( nkey )
{

    var keyval
    if ( navigator.appName == "Microsoft Internet Explorer" )
    {
        keyval = window.event.keyCode;
    }
    else if ( navigator.appName == 'Netscape' )
    {
        nkeycode = nkey.which;
        keyval = nkeycode;
    }
    //For A-Z
    if ( keyval >= 65 && keyval <= 90 )
    {
        return true;
    }
        //For a-z
    else if ( keyval > 105 && keyval <= 122 )
    {
        return true;
    }
        //For Backspace
    else if ( keyval == 8 || keyval == 9 )
    {
        return true;
    }
        //For General
    else if ( keyval == 0 )
    {
        return true;
    }
        //For Space
    else if ( keyval == 32 )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ReloadPage()
{
    ShowHideAjaxLoader( true );
    window.location = window.location.href;
}


function _submitForm( _objbtn )
{

    var _e = {};
    $_objbtn = $( _objbtn );
    var _successMessage = $( _objbtn ).attr( "_successMessage" );

    var _onClick = $( _objbtn ).attr( "_onClick" );
    var _afterError = $( _objbtn ).attr( "_onError" );
    var _afterSuccess = $( _objbtn ).attr( "_onSuccess" );

    var _returnView = $( _objbtn ).attr( "_returnView" );
    var _returnController = $( _objbtn ).attr( "_returnController" );
    var _viewName = $( _objbtn ).attr( "_viewName" );
    var _controllerName = $( _objbtn ).attr( "_controllerName" );
    var _confirmMessage = $( _objbtn ).attr( "_confirmMessage" );
    var _causeValidation = $( _objbtn ).attr( "_causeValidation" );



    _e.form = $_objbtn.closest( "form" );
    _e.model = _e.form.serializeObject();
    _e.response = null;
    _e.error = null;
    _e.showErrorMessage = true;

    if ( _e.form.length > 0 )
    {
        _e.url = _e.form.attr( "action" );
    }
    if ( _causeValidation == "false" || _e.form.length == 0 )
        _e.valid = true;
    else
        if ( _e.form.length > 0 )
            _e.valid = _e.form.valid();

    if ( _viewName )
    {
        _e.url = ( !_controllerName ? __ControllerName : _controllerName ) + "/" + _viewName;
    }

    if ( _onClick != null && _e.valid )
    {/// no calling when the form is not valid
        if ( _onClick.indexOf( "(" ) > -1 ) eval( _onClick );
        else
        {
            var doSubmit = window[_onClick]( _objbtn, _e );
            if ( doSubmit === false ) return false;
        }
    }
    if ( !_e.valid ) return false;

    if ( _causeValidation != "false" )
    {
        _e.form.bind( "submit", function ()
        {
            return false;
        } ).submit();
        var formModel = _e.form.serializeObject();
        $.extend( _e.model, _e.model, formModel );
    }

    function IfConfirm()
    {
        CallAction( _e.url, _e.model, function ( response )
        {

            if ( response == -1 && _afterError != null )
            {
                if ( _afterError.indexOf( "(" ) > -1 )
                    eval( _afterError );
                else
                    window[_afterError]( _objbtn, _e );
            }
            if ( _afterSuccess != null && _successMessage == null && response != -1 )
            {
                if ( _afterSuccess.indexOf( "(" ) > -1 )
                    eval( _afterSuccess );
                else
                    window[_afterSuccess]( response );
            }


            if ( response.ErrorCode == "0" )
            {
                _e.response = response;
                //ShowMessage('@Resources.Messages.Jobs_SavedSuccesfully');
                if ( _successMessage )
                {
                    ShowMessage( _successMessage, function ()
                    {
                        if ( _afterSuccess != null )
                        {
                            if ( _afterSuccess.indexOf( "(" ) > -1 ) eval( _afterSuccess );
                            else
                            {
                                window[_afterSuccess]( _objbtn, _e );
                            }
                        }
                        if ( _returnView != null )
                            goToView( _returnView, _returnController );

                    }, '' );
                }
                else if ( _returnView != null )
                    goToView( _returnView, _returnController );
            }
            else
            {
                if ( response.Message )
                    ShowMessage( response.Message, function () { }, '' );
            }
        } );
    }

    if ( _confirmMessage )
        ShowConfirm( _confirmMessage, IfConfirm );
    else IfConfirm();
}


function CreateTree( $tree, data, selectedIDs, idKey, titleKey, parentId, hideCheckBox, onSelectFunction )
{
    // to intialize tree

    if ( !selectedIDs ) selectedIDs = [];
    var ParentNode = {};
    ParentNode.key = "*";
    ParentNode.title = CommonResources.SelectAll;
    ParentNode.isFolder = true;
    ParentNode.expand = true;
    ParentNode.children = GetTreeDataFormat( data, idKey, titleKey, parentId, selectedIDs );
    var TreeData = [ParentNode];
    $tree.dynatree( {
        fx: { height: "toggle", duration: 300 },
        checkbox: !hideCheckBox,
        selectMode: 3,
        onDblClick: function ( node, event )
        {
            if ( node.getEventTargetType( event ) == "title" ) node.toggleSelect();
        },
        onKeydown: function ( node, event )
        {
            if ( event.which == 32 ) { node.toggleSelect(); return false; }
        },
        children: TreeData,
        onSelect: onSelectFunction
    } );


    // $('span.dynatree-node a')
    //.live('mouseover', function () {
    //    $(this).addClass('ui-state-hover');
    //})
    //.live('mouseout', function () {
    //    $(this).removeClass('ui-state-hover');
    //});
}
function GetSelectedValues( $tree )
{
    var __tree = $tree.dynatree( "getTree" );
    var SelectedNodes = __tree.getSelectedNodes( false );
    var selectedIds = [];
    $.each( SelectedNodes, function ( i, node )
    {
        if ( node.hasChildren() === false )
        {
            selectedIds.push( node.data.key );
        }
    } );
    return selectedIds;
}

function GetSelectedValuesWithParent( $tree )
{
    var __tree = $tree.dynatree( "getTree" );
    var SelectedNodes = __tree.getSelectedNodes( false );
    var selectedIds = [];
    $.each( SelectedNodes, function ( i, node )
    {
        selectedIds.push( node.data.key );
    } );
    debugger;
    return selectedIds;
}


function GetTreeDataFormat( JsonArr, idKey, titleKey, childrenKey, selectedIDs, IsChildMode )
{
    debugger;
    var TreeArr = [];

    if ( !$.isArray( JsonArr ) )
    {
        JsonArr = [JsonArr];
    }

    for ( var i = 0; i < JsonArr.length; i++ )
    {
        var obj = JsonArr[i];
        var TreeObj = {
            key: obj[idKey],
            title: obj[titleKey],
            parentId: obj[childrenKey]
        };
        if ( TreeObj.parentId == 0 )
        {

            TreeObj.children = GetChilds( JsonArr, TreeObj.key, idKey, titleKey, childrenKey, selectedIDs );
            TreeObj.isFolder = true;
            TreeObj.expand = false;

            if ( ( $.inArray( obj[idKey], selectedIDs, 0 ) ) > -1 )
            {
                TreeObj.select = true;
            }
            TreeArr.push( TreeObj );
        }

    }
    return TreeArr;
}


function GetChilds( array, value, idKey, idTitle, idParentId, selectedIDs )
{
    var childsArray = [];
    $.each( array, function ( i, item )
    {

        if ( i != 0 && item.ParentID == value )
        {
            var childObj = {
                key: item[idKey],
                title: item[idTitle],
                parentId: item[idParentId]
            };
            childObj.children = GetChilds( array, childObj.key, idKey, idTitle, idParentId, selectedIDs );
            childObj.isFolder = true;
            childObj.expand = false;
            if ( ( $.inArray( item[idKey], selectedIDs, 0 ) ) > -1 )
            {
                childObj.select = true;
            }
            childsArray.push( childObj );
        }

    } );
    return childsArray;
}
function SetTreeSelection( TreeObj, SelectedKeys )
{
    var tree = TreeObj.dynatree( "getTree" );
    // to remove selection
    var SelectedNodes = tree.getSelectedNodes( false );
    $.each( SelectedNodes, function ( i, node )
    {
        node.select( false );
    } );
    SelectedKeys = CheckArray( SelectedKeys );
    $.each( SelectedKeys, function ( i, key )
    {
        var node = tree.getNodeByKey( key );
        node.select( true );
    } );
}

function CheckArray( obj )
{
    if ( obj == null )
        return [];
    else if ( obj.length == null )
        return [obj];
    return obj;
}

function ShowHideAjaxLoader( DoShow )
{
    if ( DoShow )
        $( '#AjaxLoaderContainer' ).stop().show();
    else
        $( '#AjaxLoaderContainer' ).fadeOut( 500 );
}

function SaveSuccess( controller )
{
    goToView( 'SaveSuccess', controller );
    //goToView('View/' + '@Model.PersonId', 'Person');
}

$.fn.selectFirst = function ()
{
    return $( this ).find( "option:first" ).attr( "selected", "selected" ).end();
}
function createCookie( name, value )
{
    var expires;
    var days = 100;
    if ( days )
    {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = "; expires=" + date.toGMTString();
    } else
    {
        expires = "";
    }
    document.cookie = encodeURIComponent( name ) + "=" + encodeURIComponent( value ) + expires + "; path=/";
}

function readCookie( name )
{
    var nameEQ = encodeURIComponent( name ) + "=";
    var ca = document.cookie.split( ';' );
    for ( var i = 0; i < ca.length; i++ )
    {
        var c = ca[i];
        while ( c.charAt( 0 ) === ' ' ) c = c.substring( 1, c.length );
        if ( c.indexOf( nameEQ ) === 0 ) return decodeURIComponent( c.substring( nameEQ.length, c.length ) );
    }
    return null;
}

function eraseCookie( name )
{
    createCookie( name, "", -1 );
}

function CheckPrivilage( Data )
{
    var priv;
    Data = {
        privilageNumber: Data
    }

    CallAjaxMethodwithoutasync( 'Home/checkPrivilage', Data, function ( response )
    {
        priv = response;

        return ( ( response ) )

    }, false );




    return priv;
}
$( ".view-more" ).hide();
function GetClientBrwoserInfo()
{
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat( navigator.appVersion );
    var majorVersion = parseInt( navigator.appVersion, 10 );
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ( ( verOffset = nAgt.indexOf( "Opera" ) ) != -1 )
    {
        browserName = "Opera";
        fullVersion = nAgt.substring( verOffset + 6 );
        if ( ( verOffset = nAgt.indexOf( "Version" ) ) != -1 )
            fullVersion = nAgt.substring( verOffset + 8 );
    }
        // In MSIE, the true version is after "MSIE" in userAgent
    else if ( ( verOffset = nAgt.indexOf( "MSIE" ) ) != -1 )
    {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring( verOffset + 5 );
    }
        // In Chrome, the true version is after "Chrome"
    else if ( ( verOffset = nAgt.indexOf( "Chrome" ) ) != -1 )
    {
        browserName = "Chrome";
        fullVersion = nAgt.substring( verOffset + 7 );
    }
        // In Safari, the true version is after "Safari" or after "Version"
    else if ( ( verOffset = nAgt.indexOf( "Safari" ) ) != -1 )
    {
        browserName = "Safari";
        fullVersion = nAgt.substring( verOffset + 7 );
        if ( ( verOffset = nAgt.indexOf( "Version" ) ) != -1 )
            fullVersion = nAgt.substring( verOffset + 8 );
    }
        // In Firefox, the true version is after "Firefox"
    else if ( ( verOffset = nAgt.indexOf( "Firefox" ) ) != -1 )
    {
        browserName = "Firefox";
        fullVersion = nAgt.substring( verOffset + 8 );
    }
        // In most other browsers, "name/version" is at the end of userAgent
    else if ( ( nameOffset = nAgt.lastIndexOf( ' ' ) + 1 ) < ( verOffset = nAgt.lastIndexOf( '/' ) ) )
    {
        browserName = nAgt.substring( nameOffset, verOffset );
        fullVersion = nAgt.substring( verOffset + 1 );
        if ( browserName.toLowerCase() == browserName.toUpperCase() )
        {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ( ( ix = fullVersion.indexOf( ";" ) ) != -1 )
        fullVersion = fullVersion.substring( 0, ix );
    if ( ( ix = fullVersion.indexOf( " " ) ) != -1 )
        fullVersion = fullVersion.substring( 0, ix );

    majorVersion = parseInt( '' + fullVersion, 10 );
    if ( isNaN( majorVersion ) )
    {
        fullVersion = '' + parseFloat( navigator.appVersion );
        majorVersion = parseInt( navigator.appVersion, 10 );
    }

    return browserName;
}