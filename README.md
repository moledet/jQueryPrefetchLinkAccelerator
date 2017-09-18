# jQuery Prefetch Accelerator
The page loader accelerator that prefetch link and forms witch lead to another HTML page. The event fire on **_mouseover_** of _link_ or submit button of _form_.
The next page will be loaded from disc cache 1ms-10ms instead 300ms - 10min. The script may use several cache methods [preload, prefetch](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) , prerender, preconnect of html
[standard](https://www.w3.org/TR/resource-hints/) .

#Usage
The simple usage that will attach prefetch event to all links and forms of page
```js
$('body').accelerate();
```
You may select all _div_ or places that consists links or form, or select several links or forms that need
```js
$('a.accelerate, form.news').accelerate();
``` 
Also you may run accelerator with params
```js
$('body').accelerate({
  fetchMethod: "preload", // preload, prefetch, prerender, preconnect  see https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
  debugMode: false,
  disableLinkAccelerator:false,
  disableFormAccelerator:false
});
```

### Notices ###
> Response of server must be with [caching headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

> Script may  increases the load of the backend.

> Be careful with form caching (that enabled by default), on each change of input form fields and _mouse over_ of _submit_
button it will send request to server. Use script only on the search forms!
