/+  *server
/=  index
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/soto/index
  /|  /html/
      /~  ~
  ==
/=  tile-js
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/soto/js/tile
  /|  /js/
      /~  ~
  ==
/=  script
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/soto/js/index
  /|  /js/
      /~  ~
  ==
/=  style
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/soto/css/index
  /|  /css/
      /~  ~
  ==
=,  format
:: This core defines the moves the application makes, as well as their types.
|%
:: +move: output effect
+$  state
  $%  [%0 *]
  ==
::
+$  move  (pair bone card)
::
+$  poke
  $%  [%launch-action [@tas path @t]]
  ==
:: +card: output move payload
::
+$  card
  $%  [%poke wire dock poke]
      [%http-response =http-event:http]
      [%connect wire binding:eyre term]
      [%diff %json json]
  ==
::
--
::
|_  [bol=bowl:gall sta=state]
::
++  this  .
::
::  +prep: set up the app, migrate the state once started
::
++  prep  
  |=  old=(unit state)
  ^-  (quip move _this)
  =/  launcha/poke
    [%launch-action [%soto /sototile '/~soto/js/tile.js']]
  ?~  old
    :_  this
    :~ 
        :: %connect here tells %eyre to mount at the /~soto endpoint.
        [ost.bol %connect / [~ /'~soto'] %soto]
        [ost.bol %poke /soto [our.bol %launch] launcha]
    ==
  :-  [ost.bol %poke /soto [our.bol %launch] launcha]~
  this(sta u.old)
::
::
++  peer-sototile
  |=  wir=wire
  ^-  (quip move _this)
  :_  this
  [ost.bol %diff %json *json]~
::
::  +peer-messages: subscribe to subset of messages and updates
::
::
++  peer-primary
  |=  wir=wire
  ^-  (quip move _this)
  [~ this]
::
++  poke-json
  |=  jon=json
  ^-  (quip move _this)
  [~ this]
::
::
::  +lient arms
::
::
::  +bound: lient tells us we successfully bound our server to the ~soto url
::
++  bound
  |=  [wir=wire success=? binding=binding:eyre]
  ^-  (quip move _this)
  [~ this]
::
::  +poke-handle-http-request: serve pages from file system based on URl path
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol move this)
  |=  =inbound-request:eyre
  ^-  (quip move _this)
  ::
  =+  request-line=(parse-request-line url.request.inbound-request)
  =/  name=@t
    =+  back-path=(flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ?:  =(name 'tile')
    [[ost.bol %http-response (js-response:app tile-js)]~ this]
  ?+  site.request-line
    :_  this
    [ost.bol %http-response not-found:app]~
  ::
  ::  styling
  ::
      [%'~soto' %css %index ~]
    :_  this
    [ost.bol %http-response (css-response:app style)]~
  ::
  ::  javascript
  ::
      [%'~soto' %js %index ~]
    :_  this
    [ost.bol %http-response (js-response:app script)]~
  ::
  ::  inbox page
  ::
     [%'~soto' *]
    :_  this
    [ost.bol %http-response (html-response:app index)]~
  ==
::
--
