define(["dojo/_base/declare", // declare
"dijit/_Widget", "dojox/dtl/_Templated", "dojo/_base/array", // array.forEach
"dojo/dnd/move", "dojo/_base/event", // event.stop
"dojo/_base/fx", // fx.animateProperty
"dojo/dom-geometry", // domGeometry.position
"dojo/dom-style", // domStyle.getComputedStyle
"dojo/keys", // keys.DOWN_ARROW keys.END keys.HOME keys.LEFT_ARROW keys.PAGE_DOWN keys.PAGE_UP keys.RIGHT_ARROW keys.UP_ARROW
"dojo/_base/lang", // lang.hitch
"dojo/_base/sniff", // has("ie") has("mozilla")
"dojo/dnd/Moveable", // Moveable
"dojo/dnd/Mover", // Mover Mover.prototype.destroy.apply
"dojo/query", // query
"dijit/registry", // registry.findWidgets
"dijit/focus", // focus.focus()
"dijit/typematic", "dijit/form/Button", "dijit/form/_FormValueWidget", "dijit/_Container", "dojo/_base/connect", "dojo/number", "dojo/dom-style"], function(declare, _Widget, _Templated, array, move, event, fx, domGeometry, domStyle, keys, lang, has, Moveable, Mover, query, registry, focus, typematic, Button, _FormValueWidget, _Container, connect, number, domStyle) {


	/*=====
	var _Widget = dijit._Widget;
	var _TemplatedMixin = dijit._TemplatedMixin;
	=====*/

	// module:
	//		dijit/form/HorizontalRule
	// summary:
	//		Hash marks for `dijit.form.HorizontalSlider`

	var GradientDesigner = declare("dvia.widgets.gradientDesigner.gradientSlider.GradientSlider", [_Widget, _Templated], {

		_dijitTemplateCompat : true,
		widgetsInTemplate : true,
		default1 : null,
		default2 : null,
		focusedNode : null,

		//templateString : template,

		templateString : dojo.cache("dvia.widgets.gradientDesigner.gradientSlider", "html/gradientSlider.html"),

		// ef : dojo.fx.easing["quadInOut"],

		//Any initialization code would go here in the constructor. dijit._Widget and
		//dijit._Templated do not have parameters in their constructors, so
		//there wouldn't be any multiple-inheritance complications
		//if you were to include some paramters here.
		constructor : function() {
			console.debug("1. in gradientSlider constructor");
			//this.ef = dojo.fx.easing["quadInOut"];

		},
		//Inherited from dijit._Widget and called just before template
		//instantiation in buildRendering. This method is especially useful
		//for manipulating the template before it becomes visible.
		postMixInProperties : function() {
			console.debug("2. in gradientSlider postMixInProperties");
			// this.render();

		},
		//You can override this method to manipulate widget once it is
		//placed in the UI, but be warned that any child widgets contained
		//in it may not be ready yet.
		postCreate : function() {
			console.debug("3. in gradientSlider postCreate");

			this.startup();

		},
		//Called after the widget's children and all other widgets on the
		//page have been created. Provides an opportunity to manipulate child
		//widgets before they're displayed.
		startup : function() {
			console.debug("4. in gradientSlider startup");

			// this._getCurrentTile();

		},
		
		_onKeyPress : function(/*Event*/e) {
			console.debug("AAA");
			if(this.disabled || this.readOnly || e.altKey || e.ctrlKey || e.metaKey) {
				return;
			}
			switch(e.charOrCode) {
				case keys.RIGHT_ARROW:
					this.shift(1, evt.charOrCode);
					break;
				case keys.LEFT_ARROW:
					this.shift(-1, evt.charOrCode);
					break;
				default:
					return;
			}
			event.stop(e);
		},
		
		_onHandleClick : function(e) {
			console.debug("handle clicked", e.target.id);
			this.focusedNode = e.target;

			if(this.disabled || this.readOnly) {
				return;
			}
			if(!has("ie")) {
				// make sure you get focus when dragging the handle
				// (but don't do on IE because it causes a flicker on mouse up (due to blur then focus)
				//focus.focus(this.default1.domNode);
			}
			event.stop(e);
		},
		_onMouseMove : function(mover, leftTop) {
			// console.debug("mouse moved mover", mover.node);
			// console.debug("mouse moved leftTop", leftTop);
			var handelLeft = (leftTop.l / 3) - 6;
			var handelValueDisplay = dojo.query(".handel-value", mover.node.id)[0];
			//console.debug("mouse moved update value", handelValueDisplay);
			handelValueDisplay.innerHTML = dojo.number.round(handelLeft);
			// console.debug("mouse moved handelLeft", dojo.number.round(handelLeft));

		},
		_onMouseUp : function(e) {
			console.debug("mouse up", e);

		},
		init : function() {
			console.debug("gradientSlider init");
			// make the default left handle draggable
			this.default1 = new dojo.dnd.move.parentConstrainedMoveable("default1", {
				area : "content",
				within : true
			});
			// attach to the dnd onMove event
			connect.connect(this.default1, "onMove", this, "_onMouseMove");
			
			// make the default right handle draggable
			this.default2 = new dojo.dnd.move.parentConstrainedMoveable("default2", {
				area : "content",
				within : true
			});
			
			this.moveHandel(this.default2, 783);
			
			// attach to the dnd onMove event
			connect.connect(this.default2, "onMove", this, "_onMouseMove");

		},
		
		shift : function(dir, key) {
			console.debug("shift dir", dir);
			console.debug("shift key", key);
		},
		
		moveHandel: function(handel, leftPos){
			
			
			domStyle.set(handel.node, "left", leftPos + "px");
			
			console.debug("moveHandel left", domStyle.get(handel.node, "left"));
			console.debug("moveHandel left", leftPos);

		}
	});


	return GradientDesigner;

});
