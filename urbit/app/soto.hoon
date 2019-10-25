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
:: This iterates over item in the img directory, takes their filenames
:: at @tas (knots), takes the file as @ (binary) and runs it through the 
:: png mark.
/=  soto-png
  /^  (map knot @)
  /:  /===/app/soto/img  /_  /png/
::
=,  soto
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
::  +poke-soto: send us an action
::
++  poke-soto-action
  |=  act=action:soto
  ^-  (quip move _this)
  [~ this] 
::
++  poke-json
  |=  jon=json
  ^-  (quip move _this)
  [~ this]
::
::  +send-soto-update: utility func for sending updates to all our subscribers
::
++  send-soto-update
  |=  [upd=update str=streams]
  ^-  (list move)
  =/  updates/(list move)
    %+  turn  (prey:pubsub:userlib /primary bol)
    |=  [=bone *]
    [bone %diff %soto-update upd]
  ::
  =/  tile-updates/(list move)
    %+  turn  (prey:pubsub:userlib /sototile bol)
    |=  [=bone *]
    [bone %diff %json *json]
  ::
  %+  weld
    updates
    tile-updates

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
  ::  images
  ::
      [%'~soto' %img *]
    =/  img  (as-octs:mimes:html (~(got by soto-png) `@ta`name))
    :_  this
    [ost.bol %http-response (png-response:app img)]~
  ::
  ::  inbox page
  ::
     [%'~soto' *]
    :_  this
    [ost.bol %http-response (html-response:app index)]~
  ==
::
--
