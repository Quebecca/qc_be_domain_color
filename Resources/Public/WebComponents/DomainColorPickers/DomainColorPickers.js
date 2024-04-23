(function () {
	'use strict';

	/** @returns {void} */
	function noop() {}

	/**
	 * @template T
	 * @template S
	 * @param {T} tar
	 * @param {S} src
	 * @returns {T & S}
	 */
	function assign(tar, src) {
		// @ts-ignore
		for (const k in src) tar[k] = src[k];
		return /** @type {T & S} */ (tar);
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	/**
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function run_all(fns) {
		fns.forEach(run);
	}

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	/** @returns {boolean} */
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
	}

	/** @returns {boolean} */
	function is_empty(obj) {
		return Object.keys(obj).length === 0;
	}

	function create_slot(definition, ctx, $$scope, fn) {
		if (definition) {
			const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
			return definition[0](slot_ctx);
		}
	}

	function get_slot_context(definition, ctx, $$scope, fn) {
		return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
	}

	function get_slot_changes(definition, $$scope, dirty, fn) {
		if (definition[2] && fn) {
			const lets = definition[2](fn(dirty));
			if ($$scope.dirty === undefined) {
				return lets;
			}
			if (typeof lets === 'object') {
				const merged = [];
				const len = Math.max($$scope.dirty.length, lets.length);
				for (let i = 0; i < len; i += 1) {
					merged[i] = $$scope.dirty[i] | lets[i];
				}
				return merged;
			}
			return $$scope.dirty | lets;
		}
		return $$scope.dirty;
	}

	/** @returns {void} */
	function update_slot_base(
		slot,
		slot_definition,
		ctx,
		$$scope,
		slot_changes,
		get_slot_context_fn
	) {
		if (slot_changes) {
			const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
			slot.p(slot_context, slot_changes);
		}
	}

	/** @returns {any[] | -1} */
	function get_all_dirty_from_scope($$scope) {
		if ($$scope.ctx.length > 32) {
			const dirty = [];
			const length = $$scope.ctx.length / 32;
			for (let i = 0; i < length; i++) {
				dirty[i] = -1;
			}
			return dirty;
		}
		return -1;
	}

	function action_destroyer(action_result) {
		return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
	}

	/**
	 * @param {Node} target
	 * @param {string} style_sheet_id
	 * @param {string} styles
	 * @returns {void}
	 */
	function append_styles(target, style_sheet_id, styles) {
		const append_styles_to = get_root_for_style(target);
		if (!append_styles_to.getElementById(style_sheet_id)) {
			const style = element('style');
			style.id = style_sheet_id;
			style.textContent = styles;
			append_stylesheet(append_styles_to, style);
		}
	}

	/**
	 * @param {Node} node
	 * @returns {ShadowRoot | Document}
	 */
	function get_root_for_style(node) {
		if (!node) return document;
		const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
		if (root && /** @type {ShadowRoot} */ (root).host) {
			return /** @type {ShadowRoot} */ (root);
		}
		return node.ownerDocument;
	}

	/**
	 * @param {ShadowRoot | Document} node
	 * @param {HTMLStyleElement} style
	 * @returns {CSSStyleSheet}
	 */
	function append_stylesheet(node, style) {
		append(/** @type {Document} */ (node).head || node, style);
		return style.sheet;
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 * @returns {void} */
	function destroy_each(iterations, detaching) {
		for (let i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detaching);
		}
	}

	/**
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} name
	 * @returns {HTMLElementTagNameMap[K]}
	 */
	function element(name) {
		return document.createElement(name);
	}

	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	function text(data) {
		return document.createTextNode(data);
	}

	/**
	 * @returns {Text} */
	function space() {
		return text(' ');
	}

	/**
	 * @returns {Text} */
	function empty() {
		return text('');
	}

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @returns {() => void}
	 */
	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	/**
	 * @returns {(event: any) => any} */
	function prevent_default(fn) {
		return function (event) {
			event.preventDefault();
			// @ts-ignore
			return fn.call(this, event);
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	/**
	 * @param {Element} element
	 * @returns {ChildNode[]}
	 */
	function children(element) {
		return Array.from(element.childNodes);
	}

	/**
	 * @param {Text} text
	 * @param {unknown} data
	 * @returns {void}
	 */
	function set_data(text, data) {
		data = '' + data;
		if (text.data === data) return;
		text.data = /** @type {string} */ (data);
	}

	/**
	 * @returns {void} */
	function set_input_value(input, value) {
		input.value = value == null ? '' : value;
	}

	/**
	 * @returns {void} */
	function set_style(node, key, value, important) {
		if (value == null) {
			node.style.removeProperty(key);
		} else {
			node.style.setProperty(key, value, important ? 'important' : '');
		}
	}
	// unfortunately this can't be a constant as that wouldn't be tree-shakeable
	// so we cache the result instead

	/**
	 * @type {boolean} */
	let crossorigin;

	/**
	 * @returns {boolean} */
	function is_crossorigin() {
		if (crossorigin === undefined) {
			crossorigin = false;
			try {
				if (typeof window !== 'undefined' && window.parent) {
					void window.parent.document;
				}
			} catch (error) {
				crossorigin = true;
			}
		}
		return crossorigin;
	}

	/**
	 * @param {HTMLElement} node
	 * @param {() => void} fn
	 * @returns {() => void}
	 */
	function add_iframe_resize_listener(node, fn) {
		const computed_style = getComputedStyle(node);
		if (computed_style.position === 'static') {
			node.style.position = 'relative';
		}
		const iframe = element('iframe');
		iframe.setAttribute(
			'style',
			'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
				'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;'
		);
		iframe.setAttribute('aria-hidden', 'true');
		iframe.tabIndex = -1;
		const crossorigin = is_crossorigin();

		/**
		 * @type {() => void}
		 */
		let unsubscribe;
		if (crossorigin) {
			iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
			unsubscribe = listen(
				window,
				'message',
				/** @param {MessageEvent} event */ (event) => {
					if (event.source === iframe.contentWindow) fn();
				}
			);
		} else {
			iframe.src = 'about:blank';
			iframe.onload = () => {
				unsubscribe = listen(iframe.contentWindow, 'resize', fn);
				// make sure an initial resize event is fired _after_ the iframe is loaded (which is asynchronous)
				// see https://github.com/sveltejs/svelte/issues/4233
				fn();
			};
		}
		append(node, iframe);
		return () => {
			if (crossorigin) {
				unsubscribe();
			} else if (unsubscribe && iframe.contentWindow) {
				unsubscribe();
			}
			detach(iframe);
		};
	}

	/**
	 * @returns {void} */
	function toggle_class(element, name, toggle) {
		// The `!!` is required because an `undefined` flag means flipping the current state.
		element.classList.toggle(name, !!toggle);
	}

	/**
	 * @param {HTMLElement} element
	 * @returns {{}}
	 */
	function get_custom_elements_slots(element) {
		const result = {};
		element.childNodes.forEach(
			/** @param {Element} node */ (node) => {
				result[node.slot || 'default'] = true;
			}
		);
		return result;
	}

	/**
	 * @typedef {Node & {
	 * 	claim_order?: number;
	 * 	hydrate_init?: true;
	 * 	actual_end_child?: NodeEx;
	 * 	childNodes: NodeListOf<NodeEx>;
	 * }} NodeEx
	 */

	/** @typedef {ChildNode & NodeEx} ChildNodeEx */

	/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

	/**
	 * @typedef {ChildNodeEx[] & {
	 * 	claim_info?: {
	 * 		last_index: number;
	 * 		total_claimed: number;
	 * 	};
	 * }} ChildNodeArray
	 */

	let current_component;

	/** @returns {void} */
	function set_current_component(component) {
		current_component = component;
	}

	function get_current_component() {
		if (!current_component) throw new Error('Function called outside component initialization');
		return current_component;
	}

	/**
	 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
	 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
	 * it can be called from an external module).
	 *
	 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
	 *
	 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
	 *
	 * https://svelte.dev/docs/svelte#onmount
	 * @template T
	 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
	 * @returns {void}
	 */
	function onMount(fn) {
		get_current_component().$$.on_mount.push(fn);
	}

	// TODO figure out if we still want to support
	// shorthand events, or if we want to implement
	// a real bubbling mechanism
	/**
	 * @param component
	 * @param event
	 * @returns {void}
	 */
	function bubble(component, event) {
		const callbacks = component.$$.callbacks[event.type];
		if (callbacks) {
			// @ts-ignore
			callbacks.slice().forEach((fn) => fn.call(this, event));
		}
	}

	const dirty_components = [];
	const binding_callbacks = [];

	let render_callbacks = [];

	const flush_callbacks = [];

	const resolved_promise = /* @__PURE__ */ Promise.resolve();

	let update_scheduled = false;

	/** @returns {void} */
	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	/** @returns {void} */
	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	/** @returns {void} */
	function add_flush_callback(fn) {
		flush_callbacks.push(fn);
	}

	// flush() calls callbacks in this order:
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.
	const seen_callbacks = new Set();

	let flushidx = 0; // Do *not* move this inside the flush() function

	/** @returns {void} */
	function flush() {
		// Do not reenter flush while dirty components are updated, as this can
		// result in an infinite loop. Instead, let the inner flush handle it.
		// Reentrancy is ok afterwards for bindings etc.
		if (flushidx !== 0) {
			return;
		}
		const saved_component = current_component;
		do {
			// first, call beforeUpdate functions
			// and update components
			try {
				while (flushidx < dirty_components.length) {
					const component = dirty_components[flushidx];
					flushidx++;
					set_current_component(component);
					update(component.$$);
				}
			} catch (e) {
				// reset dirty state to not end up in a deadlocked state and then rethrow
				dirty_components.length = 0;
				flushidx = 0;
				throw e;
			}
			set_current_component(null);
			dirty_components.length = 0;
			flushidx = 0;
			while (binding_callbacks.length) binding_callbacks.pop()();
			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			for (let i = 0; i < render_callbacks.length; i += 1) {
				const callback = render_callbacks[i];
				if (!seen_callbacks.has(callback)) {
					// ...so guard against infinite loops
					seen_callbacks.add(callback);
					callback();
				}
			}
			render_callbacks.length = 0;
		} while (dirty_components.length);
		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}
		update_scheduled = false;
		seen_callbacks.clear();
		set_current_component(saved_component);
	}

	/** @returns {void} */
	function update($$) {
		if ($$.fragment !== null) {
			$$.update();
			run_all($$.before_update);
			const dirty = $$.dirty;
			$$.dirty = [-1];
			$$.fragment && $$.fragment.p($$.ctx, dirty);
			$$.after_update.forEach(add_render_callback);
		}
	}

	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function flush_render_callbacks(fns) {
		const filtered = [];
		const targets = [];
		render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
		targets.forEach((c) => c());
		render_callbacks = filtered;
	}

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

	/**
	 * @returns {void} */
	function group_outros() {
		outros = {
			r: 0,
			c: [],
			p: outros // parent group
		};
	}

	/**
	 * @returns {void} */
	function check_outros() {
		if (!outros.r) {
			run_all(outros.c);
		}
		outros = outros.p;
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} [local]
	 * @returns {void}
	 */
	function transition_in(block, local) {
		if (block && block.i) {
			outroing.delete(block);
			block.i(local);
		}
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} local
	 * @param {0 | 1} [detach]
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	function transition_out(block, local, detach, callback) {
		if (block && block.o) {
			if (outroing.has(block)) return;
			outroing.add(block);
			outros.c.push(() => {
				outroing.delete(block);
				if (callback) {
					if (detach) block.d(1);
					callback();
				}
			});
			block.o(local);
		} else if (callback) {
			callback();
		}
	}

	/** @typedef {1} INTRO */
	/** @typedef {0} OUTRO */
	/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
	/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

	/**
	 * @typedef {Object} Outro
	 * @property {number} r
	 * @property {Function[]} c
	 * @property {Object} p
	 */

	/**
	 * @typedef {Object} PendingProgram
	 * @property {number} start
	 * @property {INTRO|OUTRO} b
	 * @property {Outro} [group]
	 */

	/**
	 * @typedef {Object} Program
	 * @property {number} a
	 * @property {INTRO|OUTRO} b
	 * @property {1|-1} d
	 * @property {number} duration
	 * @property {number} start
	 * @property {number} end
	 * @property {Outro} [group]
	 */

	// general each functions:

	function ensure_array_like(array_like_or_iterator) {
		return array_like_or_iterator?.length !== undefined
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}

	/** @returns {void} */
	function bind(component, name, callback) {
		const index = component.$$.props[name];
		if (index !== undefined) {
			component.$$.bound[index] = callback;
			callback(component.$$.ctx[index]);
		}
	}

	/** @returns {void} */
	function create_component(block) {
		block && block.c();
	}

	/** @returns {void} */
	function mount_component(component, target, anchor) {
		const { fragment, after_update } = component.$$;
		fragment && fragment.m(target, anchor);
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
			// if the component was destroyed immediately
			// it will update the `$$.on_destroy` reference to `null`.
			// the destructured on_destroy may still reference to the old array
			if (component.$$.on_destroy) {
				component.$$.on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
		after_update.forEach(add_render_callback);
	}

	/** @returns {void} */
	function destroy_component(component, detaching) {
		const $$ = component.$$;
		if ($$.fragment !== null) {
			flush_render_callbacks($$.after_update);
			run_all($$.on_destroy);
			$$.fragment && $$.fragment.d(detaching);
			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			$$.on_destroy = $$.fragment = null;
			$$.ctx = [];
		}
	}

	/** @returns {void} */
	function make_dirty(component, i) {
		if (component.$$.dirty[0] === -1) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty.fill(0);
		}
		component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
	}

	// TODO: Document the other params
	/**
	 * @param {SvelteComponent} component
	 * @param {import('./public.js').ComponentConstructorOptions} options
	 *
	 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
	 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
	 * This will be the `add_css` function from the compiled component.
	 *
	 * @returns {void}
	 */
	function init(
		component,
		options,
		instance,
		create_fragment,
		not_equal,
		props,
		append_styles = null,
		dirty = [-1]
	) {
		const parent_component = current_component;
		set_current_component(component);
		/** @type {import('./private.js').T$$} */
		const $$ = (component.$$ = {
			fragment: null,
			ctx: [],
			// state
			props,
			update: noop,
			not_equal,
			bound: blank_object(),
			// lifecycle
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
			// everything else
			callbacks: blank_object(),
			dirty,
			skip_bound: false,
			root: options.target || parent_component.$$.root
		});
		append_styles && append_styles($$.root);
		let ready = false;
		$$.ctx = instance
			? instance(component, options.props || {}, (i, ret, ...rest) => {
					const value = rest.length ? rest[0] : ret;
					if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}
					return ret;
			  })
			: [];
		$$.update();
		ready = true;
		run_all($$.before_update);
		// `false` as a special case of no DOM component
		$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
		if (options.target) {
			if (options.hydrate) {
				// TODO: what is the correct type here?
				// @ts-expect-error
				const nodes = children(options.target);
				$$.fragment && $$.fragment.l(nodes);
				nodes.forEach(detach);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.c();
			}
			if (options.intro) transition_in(component.$$.fragment);
			mount_component(component, options.target, options.anchor);
			flush();
		}
		set_current_component(parent_component);
	}

	let SvelteElement;

	if (typeof HTMLElement === 'function') {
		SvelteElement = class extends HTMLElement {
			/** The Svelte component constructor */
			$$ctor;
			/** Slots */
			$$s;
			/** The Svelte component instance */
			$$c;
			/** Whether or not the custom element is connected */
			$$cn = false;
			/** Component props data */
			$$d = {};
			/** `true` if currently in the process of reflecting component props back to attributes */
			$$r = false;
			/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
			$$p_d = {};
			/** @type {Record<string, Function[]>} Event listeners */
			$$l = {};
			/** @type {Map<Function, Function>} Event listener unsubscribe functions */
			$$l_u = new Map();

			constructor($$componentCtor, $$slots, use_shadow_dom) {
				super();
				this.$$ctor = $$componentCtor;
				this.$$s = $$slots;
				if (use_shadow_dom) {
					this.attachShadow({ mode: 'open' });
				}
			}

			addEventListener(type, listener, options) {
				// We can't determine upfront if the event is a custom event or not, so we have to
				// listen to both. If someone uses a custom event with the same name as a regular
				// browser event, this fires twice - we can't avoid that.
				this.$$l[type] = this.$$l[type] || [];
				this.$$l[type].push(listener);
				if (this.$$c) {
					const unsub = this.$$c.$on(type, listener);
					this.$$l_u.set(listener, unsub);
				}
				super.addEventListener(type, listener, options);
			}

			removeEventListener(type, listener, options) {
				super.removeEventListener(type, listener, options);
				if (this.$$c) {
					const unsub = this.$$l_u.get(listener);
					if (unsub) {
						unsub();
						this.$$l_u.delete(listener);
					}
				}
			}

			async connectedCallback() {
				this.$$cn = true;
				if (!this.$$c) {
					// We wait one tick to let possible child slot elements be created/mounted
					await Promise.resolve();
					if (!this.$$cn || this.$$c) {
						return;
					}
					function create_slot(name) {
						return () => {
							let node;
							const obj = {
								c: function create() {
									node = element('slot');
									if (name !== 'default') {
										attr(node, 'name', name);
									}
								},
								/**
								 * @param {HTMLElement} target
								 * @param {HTMLElement} [anchor]
								 */
								m: function mount(target, anchor) {
									insert(target, node, anchor);
								},
								d: function destroy(detaching) {
									if (detaching) {
										detach(node);
									}
								}
							};
							return obj;
						};
					}
					const $$slots = {};
					const existing_slots = get_custom_elements_slots(this);
					for (const name of this.$$s) {
						if (name in existing_slots) {
							$$slots[name] = [create_slot(name)];
						}
					}
					for (const attribute of this.attributes) {
						// this.$$data takes precedence over this.attributes
						const name = this.$$g_p(attribute.name);
						if (!(name in this.$$d)) {
							this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
						}
					}
					// Port over props that were set programmatically before ce was initialized
					for (const key in this.$$p_d) {
						if (!(key in this.$$d) && this[key] !== undefined) {
							this.$$d[key] = this[key]; // don't transform, these were set through JavaScript
							delete this[key]; // remove the property that shadows the getter/setter
						}
					}
					this.$$c = new this.$$ctor({
						target: this.shadowRoot || this,
						props: {
							...this.$$d,
							$$slots,
							$$scope: {
								ctx: []
							}
						}
					});

					// Reflect component props as attributes
					const reflect_attributes = () => {
						this.$$r = true;
						for (const key in this.$$p_d) {
							this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
							if (this.$$p_d[key].reflect) {
								const attribute_value = get_custom_element_value(
									key,
									this.$$d[key],
									this.$$p_d,
									'toAttribute'
								);
								if (attribute_value == null) {
									this.removeAttribute(this.$$p_d[key].attribute || key);
								} else {
									this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
								}
							}
						}
						this.$$r = false;
					};
					this.$$c.$$.after_update.push(reflect_attributes);
					reflect_attributes(); // once initially because after_update is added too late for first render

					for (const type in this.$$l) {
						for (const listener of this.$$l[type]) {
							const unsub = this.$$c.$on(type, listener);
							this.$$l_u.set(listener, unsub);
						}
					}
					this.$$l = {};
				}
			}

			// We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
			// and setting attributes through setAttribute etc, this is helpful
			attributeChangedCallback(attr, _oldValue, newValue) {
				if (this.$$r) return;
				attr = this.$$g_p(attr);
				this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
				this.$$c?.$set({ [attr]: this.$$d[attr] });
			}

			disconnectedCallback() {
				this.$$cn = false;
				// In a microtask, because this could be a move within the DOM
				Promise.resolve().then(() => {
					if (!this.$$cn) {
						this.$$c.$destroy();
						this.$$c = undefined;
					}
				});
			}

			$$g_p(attribute_name) {
				return (
					Object.keys(this.$$p_d).find(
						(key) =>
							this.$$p_d[key].attribute === attribute_name ||
							(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
					) || attribute_name
				);
			}
		};
	}

	/**
	 * @param {string} prop
	 * @param {any} value
	 * @param {Record<string, CustomElementPropDefinition>} props_definition
	 * @param {'toAttribute' | 'toProp'} [transform]
	 */
	function get_custom_element_value(prop, value, props_definition, transform) {
		const type = props_definition[prop]?.type;
		value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
		if (!transform || !props_definition[prop]) {
			return value;
		} else if (transform === 'toAttribute') {
			switch (type) {
				case 'Object':
				case 'Array':
					return value == null ? null : JSON.stringify(value);
				case 'Boolean':
					return value ? '' : null;
				case 'Number':
					return value == null ? null : value;
				default:
					return value;
			}
		} else {
			switch (type) {
				case 'Object':
				case 'Array':
					return value && JSON.parse(value);
				case 'Boolean':
					return value; // conversion already handled above
				case 'Number':
					return value != null ? +value : value;
				default:
					return value;
			}
		}
	}

	/**
	 * @internal
	 *
	 * Turn a Svelte component into a custom element.
	 * @param {import('./public.js').ComponentType} Component  A Svelte component constructor
	 * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
	 * @param {string[]} slots  The slots to create
	 * @param {string[]} accessors  Other accessors besides the ones for props the component has
	 * @param {boolean} use_shadow_dom  Whether to use shadow DOM
	 * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
	 */
	function create_custom_element(
		Component,
		props_definition,
		slots,
		accessors,
		use_shadow_dom,
		extend
	) {
		let Class = class extends SvelteElement {
			constructor() {
				super(Component, slots, use_shadow_dom);
				this.$$p_d = props_definition;
			}
			static get observedAttributes() {
				return Object.keys(props_definition).map((key) =>
					(props_definition[key].attribute || key).toLowerCase()
				);
			}
		};
		Object.keys(props_definition).forEach((prop) => {
			Object.defineProperty(Class.prototype, prop, {
				get() {
					return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
				},
				set(value) {
					value = get_custom_element_value(prop, value, props_definition);
					this.$$d[prop] = value;
					this.$$c?.$set({ [prop]: value });
				}
			});
		});
		accessors.forEach((accessor) => {
			Object.defineProperty(Class.prototype, accessor, {
				get() {
					return this.$$c?.[accessor];
				}
			});
		});
		if (extend) {
			// @ts-expect-error - assigning here is fine
			Class = extend(Class);
		}
		Component.element = /** @type {any} */ (Class);
		return Class;
	}

	/**
	 * Base class for Svelte components. Used when dev=false.
	 *
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 */
	class SvelteComponent {
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$ = undefined;
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$set = undefined;

		/** @returns {void} */
		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop;
		}

		/**
		 * @template {Extract<keyof Events, string>} K
		 * @param {K} type
		 * @param {((e: Events[K]) => void) | null | undefined} callback
		 * @returns {() => void}
		 */
		$on(type, callback) {
			if (!is_function(callback)) {
				return noop;
			}
			const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
			callbacks.push(callback);
			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		/**
		 * @param {Partial<Props>} props
		 * @returns {void}
		 */
		$set(props) {
			if (this.$$set && !is_empty(props)) {
				this.$$.skip_bound = true;
				this.$$set(props);
				this.$$.skip_bound = false;
			}
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	// generated during release, do not modify

	const PUBLIC_VERSION = '4';

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

	/**
	 * Take input from [0, n] and return it as [0, 1]
	 * @hidden
	 */
	function bound01(n, max) {
	    if (isOnePointZero(n)) {
	        n = '100%';
	    }
	    var isPercent = isPercentage(n);
	    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
	    // Automatically convert percentage into number
	    if (isPercent) {
	        n = parseInt(String(n * max), 10) / 100;
	    }
	    // Handle floating point rounding errors
	    if (Math.abs(n - max) < 0.000001) {
	        return 1;
	    }
	    // Convert into [0, 1] range if it isn't already
	    if (max === 360) {
	        // If n is a hue given in degrees,
	        // wrap around out-of-range values into [0, 360] range
	        // then convert into [0, 1].
	        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
	    }
	    else {
	        // If n not a hue given in degrees
	        // Convert into [0, 1] range if it isn't already.
	        n = (n % max) / parseFloat(String(max));
	    }
	    return n;
	}
	/**
	 * Force a number between 0 and 1
	 * @hidden
	 */
	function clamp01(val) {
	    return Math.min(1, Math.max(0, val));
	}
	/**
	 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	 * @hidden
	 */
	function isOnePointZero(n) {
	    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
	}
	/**
	 * Check to see if string passed in is a percentage
	 * @hidden
	 */
	function isPercentage(n) {
	    return typeof n === 'string' && n.indexOf('%') !== -1;
	}
	/**
	 * Return a valid alpha value [0,1] with all invalid values being set to 1
	 * @hidden
	 */
	function boundAlpha(a) {
	    a = parseFloat(a);
	    if (isNaN(a) || a < 0 || a > 1) {
	        a = 1;
	    }
	    return a;
	}
	/**
	 * Replace a decimal with it's percentage value
	 * @hidden
	 */
	function convertToPercentage(n) {
	    if (n <= 1) {
	        return "".concat(Number(n) * 100, "%");
	    }
	    return n;
	}
	/**
	 * Force a hex value to have 2 characters
	 * @hidden
	 */
	function pad2(c) {
	    return c.length === 1 ? '0' + c : String(c);
	}

	// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
	/**
	 * Handle bounds / percentage checking to conform to CSS color spec
	 * <http://www.w3.org/TR/css3-color/>
	 * *Assumes:* r, g, b in [0, 255] or [0, 1]
	 * *Returns:* { r, g, b } in [0, 255]
	 */
	function rgbToRgb(r, g, b) {
	    return {
	        r: bound01(r, 255) * 255,
	        g: bound01(g, 255) * 255,
	        b: bound01(b, 255) * 255,
	    };
	}
	/**
	 * Converts an RGB color value to HSL.
	 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	 * *Returns:* { h, s, l } in [0,1]
	 */
	function rgbToHsl(r, g, b) {
	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);
	    var max = Math.max(r, g, b);
	    var min = Math.min(r, g, b);
	    var h = 0;
	    var s = 0;
	    var l = (max + min) / 2;
	    if (max === min) {
	        s = 0;
	        h = 0; // achromatic
	    }
	    else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch (max) {
	            case r:
	                h = (g - b) / d + (g < b ? 6 : 0);
	                break;
	            case g:
	                h = (b - r) / d + 2;
	                break;
	            case b:
	                h = (r - g) / d + 4;
	                break;
	        }
	        h /= 6;
	    }
	    return { h: h, s: s, l: l };
	}
	function hue2rgb(p, q, t) {
	    if (t < 0) {
	        t += 1;
	    }
	    if (t > 1) {
	        t -= 1;
	    }
	    if (t < 1 / 6) {
	        return p + (q - p) * (6 * t);
	    }
	    if (t < 1 / 2) {
	        return q;
	    }
	    if (t < 2 / 3) {
	        return p + (q - p) * (2 / 3 - t) * 6;
	    }
	    return p;
	}
	/**
	 * Converts an HSL color value to RGB.
	 *
	 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	 * *Returns:* { r, g, b } in the set [0, 255]
	 */
	function hslToRgb(h, s, l) {
	    var r;
	    var g;
	    var b;
	    h = bound01(h, 360);
	    s = bound01(s, 100);
	    l = bound01(l, 100);
	    if (s === 0) {
	        // achromatic
	        g = l;
	        b = l;
	        r = l;
	    }
	    else {
	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1 / 3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1 / 3);
	    }
	    return { r: r * 255, g: g * 255, b: b * 255 };
	}
	/**
	 * Converts an RGB color value to HSV
	 *
	 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	 * *Returns:* { h, s, v } in [0,1]
	 */
	function rgbToHsv(r, g, b) {
	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);
	    var max = Math.max(r, g, b);
	    var min = Math.min(r, g, b);
	    var h = 0;
	    var v = max;
	    var d = max - min;
	    var s = max === 0 ? 0 : d / max;
	    if (max === min) {
	        h = 0; // achromatic
	    }
	    else {
	        switch (max) {
	            case r:
	                h = (g - b) / d + (g < b ? 6 : 0);
	                break;
	            case g:
	                h = (b - r) / d + 2;
	                break;
	            case b:
	                h = (r - g) / d + 4;
	                break;
	        }
	        h /= 6;
	    }
	    return { h: h, s: s, v: v };
	}
	/**
	 * Converts an HSV color value to RGB.
	 *
	 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	 * *Returns:* { r, g, b } in the set [0, 255]
	 */
	function hsvToRgb(h, s, v) {
	    h = bound01(h, 360) * 6;
	    s = bound01(s, 100);
	    v = bound01(v, 100);
	    var i = Math.floor(h);
	    var f = h - i;
	    var p = v * (1 - s);
	    var q = v * (1 - f * s);
	    var t = v * (1 - (1 - f) * s);
	    var mod = i % 6;
	    var r = [v, q, p, p, t, v][mod];
	    var g = [t, v, v, q, p, p][mod];
	    var b = [p, p, t, v, v, q][mod];
	    return { r: r * 255, g: g * 255, b: b * 255 };
	}
	/**
	 * Converts an RGB color to hex
	 *
	 * Assumes r, g, and b are contained in the set [0, 255]
	 * Returns a 3 or 6 character hex
	 */
	function rgbToHex(r, g, b, allow3Char) {
	    var hex = [
	        pad2(Math.round(r).toString(16)),
	        pad2(Math.round(g).toString(16)),
	        pad2(Math.round(b).toString(16)),
	    ];
	    // Return a 3 character hex if possible
	    if (allow3Char &&
	        hex[0].startsWith(hex[0].charAt(1)) &&
	        hex[1].startsWith(hex[1].charAt(1)) &&
	        hex[2].startsWith(hex[2].charAt(1))) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	    }
	    return hex.join('');
	}
	/**
	 * Converts an RGBA color plus alpha transparency to hex
	 *
	 * Assumes r, g, b are contained in the set [0, 255] and
	 * a in [0, 1]. Returns a 4 or 8 character rgba hex
	 */
	// eslint-disable-next-line max-params
	function rgbaToHex(r, g, b, a, allow4Char) {
	    var hex = [
	        pad2(Math.round(r).toString(16)),
	        pad2(Math.round(g).toString(16)),
	        pad2(Math.round(b).toString(16)),
	        pad2(convertDecimalToHex(a)),
	    ];
	    // Return a 4 character hex if possible
	    if (allow4Char &&
	        hex[0].startsWith(hex[0].charAt(1)) &&
	        hex[1].startsWith(hex[1].charAt(1)) &&
	        hex[2].startsWith(hex[2].charAt(1)) &&
	        hex[3].startsWith(hex[3].charAt(1))) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	    }
	    return hex.join('');
	}
	/** Converts a decimal to a hex value */
	function convertDecimalToHex(d) {
	    return Math.round(parseFloat(d) * 255).toString(16);
	}
	/** Converts a hex value to a decimal */
	function convertHexToDecimal(h) {
	    return parseIntFromHex(h) / 255;
	}
	/** Parse a base-16 hex value into a base-10 integer */
	function parseIntFromHex(val) {
	    return parseInt(val, 16);
	}
	function numberInputToObject(color) {
	    return {
	        r: color >> 16,
	        g: (color & 0xff00) >> 8,
	        b: color & 0xff,
	    };
	}

	// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
	/**
	 * @hidden
	 */
	var names = {
	    aliceblue: '#f0f8ff',
	    antiquewhite: '#faebd7',
	    aqua: '#00ffff',
	    aquamarine: '#7fffd4',
	    azure: '#f0ffff',
	    beige: '#f5f5dc',
	    bisque: '#ffe4c4',
	    black: '#000000',
	    blanchedalmond: '#ffebcd',
	    blue: '#0000ff',
	    blueviolet: '#8a2be2',
	    brown: '#a52a2a',
	    burlywood: '#deb887',
	    cadetblue: '#5f9ea0',
	    chartreuse: '#7fff00',
	    chocolate: '#d2691e',
	    coral: '#ff7f50',
	    cornflowerblue: '#6495ed',
	    cornsilk: '#fff8dc',
	    crimson: '#dc143c',
	    cyan: '#00ffff',
	    darkblue: '#00008b',
	    darkcyan: '#008b8b',
	    darkgoldenrod: '#b8860b',
	    darkgray: '#a9a9a9',
	    darkgreen: '#006400',
	    darkgrey: '#a9a9a9',
	    darkkhaki: '#bdb76b',
	    darkmagenta: '#8b008b',
	    darkolivegreen: '#556b2f',
	    darkorange: '#ff8c00',
	    darkorchid: '#9932cc',
	    darkred: '#8b0000',
	    darksalmon: '#e9967a',
	    darkseagreen: '#8fbc8f',
	    darkslateblue: '#483d8b',
	    darkslategray: '#2f4f4f',
	    darkslategrey: '#2f4f4f',
	    darkturquoise: '#00ced1',
	    darkviolet: '#9400d3',
	    deeppink: '#ff1493',
	    deepskyblue: '#00bfff',
	    dimgray: '#696969',
	    dimgrey: '#696969',
	    dodgerblue: '#1e90ff',
	    firebrick: '#b22222',
	    floralwhite: '#fffaf0',
	    forestgreen: '#228b22',
	    fuchsia: '#ff00ff',
	    gainsboro: '#dcdcdc',
	    ghostwhite: '#f8f8ff',
	    goldenrod: '#daa520',
	    gold: '#ffd700',
	    gray: '#808080',
	    green: '#008000',
	    greenyellow: '#adff2f',
	    grey: '#808080',
	    honeydew: '#f0fff0',
	    hotpink: '#ff69b4',
	    indianred: '#cd5c5c',
	    indigo: '#4b0082',
	    ivory: '#fffff0',
	    khaki: '#f0e68c',
	    lavenderblush: '#fff0f5',
	    lavender: '#e6e6fa',
	    lawngreen: '#7cfc00',
	    lemonchiffon: '#fffacd',
	    lightblue: '#add8e6',
	    lightcoral: '#f08080',
	    lightcyan: '#e0ffff',
	    lightgoldenrodyellow: '#fafad2',
	    lightgray: '#d3d3d3',
	    lightgreen: '#90ee90',
	    lightgrey: '#d3d3d3',
	    lightpink: '#ffb6c1',
	    lightsalmon: '#ffa07a',
	    lightseagreen: '#20b2aa',
	    lightskyblue: '#87cefa',
	    lightslategray: '#778899',
	    lightslategrey: '#778899',
	    lightsteelblue: '#b0c4de',
	    lightyellow: '#ffffe0',
	    lime: '#00ff00',
	    limegreen: '#32cd32',
	    linen: '#faf0e6',
	    magenta: '#ff00ff',
	    maroon: '#800000',
	    mediumaquamarine: '#66cdaa',
	    mediumblue: '#0000cd',
	    mediumorchid: '#ba55d3',
	    mediumpurple: '#9370db',
	    mediumseagreen: '#3cb371',
	    mediumslateblue: '#7b68ee',
	    mediumspringgreen: '#00fa9a',
	    mediumturquoise: '#48d1cc',
	    mediumvioletred: '#c71585',
	    midnightblue: '#191970',
	    mintcream: '#f5fffa',
	    mistyrose: '#ffe4e1',
	    moccasin: '#ffe4b5',
	    navajowhite: '#ffdead',
	    navy: '#000080',
	    oldlace: '#fdf5e6',
	    olive: '#808000',
	    olivedrab: '#6b8e23',
	    orange: '#ffa500',
	    orangered: '#ff4500',
	    orchid: '#da70d6',
	    palegoldenrod: '#eee8aa',
	    palegreen: '#98fb98',
	    paleturquoise: '#afeeee',
	    palevioletred: '#db7093',
	    papayawhip: '#ffefd5',
	    peachpuff: '#ffdab9',
	    peru: '#cd853f',
	    pink: '#ffc0cb',
	    plum: '#dda0dd',
	    powderblue: '#b0e0e6',
	    purple: '#800080',
	    rebeccapurple: '#663399',
	    red: '#ff0000',
	    rosybrown: '#bc8f8f',
	    royalblue: '#4169e1',
	    saddlebrown: '#8b4513',
	    salmon: '#fa8072',
	    sandybrown: '#f4a460',
	    seagreen: '#2e8b57',
	    seashell: '#fff5ee',
	    sienna: '#a0522d',
	    silver: '#c0c0c0',
	    skyblue: '#87ceeb',
	    slateblue: '#6a5acd',
	    slategray: '#708090',
	    slategrey: '#708090',
	    snow: '#fffafa',
	    springgreen: '#00ff7f',
	    steelblue: '#4682b4',
	    tan: '#d2b48c',
	    teal: '#008080',
	    thistle: '#d8bfd8',
	    tomato: '#ff6347',
	    turquoise: '#40e0d0',
	    violet: '#ee82ee',
	    wheat: '#f5deb3',
	    white: '#ffffff',
	    whitesmoke: '#f5f5f5',
	    yellow: '#ffff00',
	    yellowgreen: '#9acd32',
	};

	/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
	/**
	 * Given a string or object, convert that input to RGB
	 *
	 * Possible string inputs:
	 * ```
	 * "red"
	 * "#f00" or "f00"
	 * "#ff0000" or "ff0000"
	 * "#ff000000" or "ff000000"
	 * "rgb 255 0 0" or "rgb (255, 0, 0)"
	 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	 * ```
	 */
	function inputToRGB(color) {
	    var rgb = { r: 0, g: 0, b: 0 };
	    var a = 1;
	    var s = null;
	    var v = null;
	    var l = null;
	    var ok = false;
	    var format = false;
	    if (typeof color === 'string') {
	        color = stringInputToObject(color);
	    }
	    if (typeof color === 'object') {
	        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
	            rgb = rgbToRgb(color.r, color.g, color.b);
	            ok = true;
	            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
	            s = convertToPercentage(color.s);
	            v = convertToPercentage(color.v);
	            rgb = hsvToRgb(color.h, s, v);
	            ok = true;
	            format = 'hsv';
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
	            s = convertToPercentage(color.s);
	            l = convertToPercentage(color.l);
	            rgb = hslToRgb(color.h, s, l);
	            ok = true;
	            format = 'hsl';
	        }
	        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
	            a = color.a;
	        }
	    }
	    a = boundAlpha(a);
	    return {
	        ok: ok,
	        format: color.format || format,
	        r: Math.min(255, Math.max(rgb.r, 0)),
	        g: Math.min(255, Math.max(rgb.g, 0)),
	        b: Math.min(255, Math.max(rgb.b, 0)),
	        a: a,
	    };
	}
	// <http://www.w3.org/TR/css3-values/#integers>
	var CSS_INTEGER = '[-\\+]?\\d+%?';
	// <http://www.w3.org/TR/css3-values/#number-value>
	var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
	// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
	// Actual matching.
	// Parentheses and commas are optional, but not required.
	// Whitespace can take the place of commas or opening paren
	var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
	var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
	var matchers = {
	    CSS_UNIT: new RegExp(CSS_UNIT),
	    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
	    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
	    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
	    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
	    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
	    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
	    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	};
	/**
	 * Permissive string parsing.  Take in a number of formats, and output an object
	 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	 */
	function stringInputToObject(color) {
	    color = color.trim().toLowerCase();
	    if (color.length === 0) {
	        return false;
	    }
	    var named = false;
	    if (names[color]) {
	        color = names[color];
	        named = true;
	    }
	    else if (color === 'transparent') {
	        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
	    }
	    // Try to match string input using regular expressions.
	    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	    // Just return an object and let the conversion functions handle that.
	    // This way the result will be the same whether the tinycolor is initialized with string or object.
	    var match = matchers.rgb.exec(color);
	    if (match) {
	        return { r: match[1], g: match[2], b: match[3] };
	    }
	    match = matchers.rgba.exec(color);
	    if (match) {
	        return { r: match[1], g: match[2], b: match[3], a: match[4] };
	    }
	    match = matchers.hsl.exec(color);
	    if (match) {
	        return { h: match[1], s: match[2], l: match[3] };
	    }
	    match = matchers.hsla.exec(color);
	    if (match) {
	        return { h: match[1], s: match[2], l: match[3], a: match[4] };
	    }
	    match = matchers.hsv.exec(color);
	    if (match) {
	        return { h: match[1], s: match[2], v: match[3] };
	    }
	    match = matchers.hsva.exec(color);
	    if (match) {
	        return { h: match[1], s: match[2], v: match[3], a: match[4] };
	    }
	    match = matchers.hex8.exec(color);
	    if (match) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            a: convertHexToDecimal(match[4]),
	            format: named ? 'name' : 'hex8',
	        };
	    }
	    match = matchers.hex6.exec(color);
	    if (match) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            format: named ? 'name' : 'hex',
	        };
	    }
	    match = matchers.hex4.exec(color);
	    if (match) {
	        return {
	            r: parseIntFromHex(match[1] + match[1]),
	            g: parseIntFromHex(match[2] + match[2]),
	            b: parseIntFromHex(match[3] + match[3]),
	            a: convertHexToDecimal(match[4] + match[4]),
	            format: named ? 'name' : 'hex8',
	        };
	    }
	    match = matchers.hex3.exec(color);
	    if (match) {
	        return {
	            r: parseIntFromHex(match[1] + match[1]),
	            g: parseIntFromHex(match[2] + match[2]),
	            b: parseIntFromHex(match[3] + match[3]),
	            format: named ? 'name' : 'hex',
	        };
	    }
	    return false;
	}
	/**
	 * Check to see if it looks like a CSS unit
	 * (see `matchers` above for definition).
	 */
	function isValidCSSUnit(color) {
	    return Boolean(matchers.CSS_UNIT.exec(String(color)));
	}

	var TinyColor = /** @class */ (function () {
	    function TinyColor(color, opts) {
	        if (color === void 0) { color = ''; }
	        if (opts === void 0) { opts = {}; }
	        var _a;
	        // If input is already a tinycolor, return itself
	        if (color instanceof TinyColor) {
	            // eslint-disable-next-line no-constructor-return
	            return color;
	        }
	        if (typeof color === 'number') {
	            color = numberInputToObject(color);
	        }
	        this.originalInput = color;
	        var rgb = inputToRGB(color);
	        this.originalInput = color;
	        this.r = rgb.r;
	        this.g = rgb.g;
	        this.b = rgb.b;
	        this.a = rgb.a;
	        this.roundA = Math.round(100 * this.a) / 100;
	        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
	        this.gradientType = opts.gradientType;
	        // Don't let the range of [0,255] come back in [0,1].
	        // Potentially lose a little bit of precision here, but will fix issues where
	        // .5 gets interpreted as half of the total, instead of half of 1
	        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	        if (this.r < 1) {
	            this.r = Math.round(this.r);
	        }
	        if (this.g < 1) {
	            this.g = Math.round(this.g);
	        }
	        if (this.b < 1) {
	            this.b = Math.round(this.b);
	        }
	        this.isValid = rgb.ok;
	    }
	    TinyColor.prototype.isDark = function () {
	        return this.getBrightness() < 128;
	    };
	    TinyColor.prototype.isLight = function () {
	        return !this.isDark();
	    };
	    /**
	     * Returns the perceived brightness of the color, from 0-255.
	     */
	    TinyColor.prototype.getBrightness = function () {
	        // http://www.w3.org/TR/AERT#color-contrast
	        var rgb = this.toRgb();
	        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	    };
	    /**
	     * Returns the perceived luminance of a color, from 0-1.
	     */
	    TinyColor.prototype.getLuminance = function () {
	        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	        var rgb = this.toRgb();
	        var R;
	        var G;
	        var B;
	        var RsRGB = rgb.r / 255;
	        var GsRGB = rgb.g / 255;
	        var BsRGB = rgb.b / 255;
	        if (RsRGB <= 0.03928) {
	            R = RsRGB / 12.92;
	        }
	        else {
	            // eslint-disable-next-line prefer-exponentiation-operator
	            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
	        }
	        if (GsRGB <= 0.03928) {
	            G = GsRGB / 12.92;
	        }
	        else {
	            // eslint-disable-next-line prefer-exponentiation-operator
	            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
	        }
	        if (BsRGB <= 0.03928) {
	            B = BsRGB / 12.92;
	        }
	        else {
	            // eslint-disable-next-line prefer-exponentiation-operator
	            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
	        }
	        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
	    };
	    /**
	     * Returns the alpha value of a color, from 0-1.
	     */
	    TinyColor.prototype.getAlpha = function () {
	        return this.a;
	    };
	    /**
	     * Sets the alpha value on the current color.
	     *
	     * @param alpha - The new alpha value. The accepted range is 0-1.
	     */
	    TinyColor.prototype.setAlpha = function (alpha) {
	        this.a = boundAlpha(alpha);
	        this.roundA = Math.round(100 * this.a) / 100;
	        return this;
	    };
	    /**
	     * Returns whether the color is monochrome.
	     */
	    TinyColor.prototype.isMonochrome = function () {
	        var s = this.toHsl().s;
	        return s === 0;
	    };
	    /**
	     * Returns the object as a HSVA object.
	     */
	    TinyColor.prototype.toHsv = function () {
	        var hsv = rgbToHsv(this.r, this.g, this.b);
	        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
	    };
	    /**
	     * Returns the hsva values interpolated into a string with the following format:
	     * "hsva(xxx, xxx, xxx, xx)".
	     */
	    TinyColor.prototype.toHsvString = function () {
	        var hsv = rgbToHsv(this.r, this.g, this.b);
	        var h = Math.round(hsv.h * 360);
	        var s = Math.round(hsv.s * 100);
	        var v = Math.round(hsv.v * 100);
	        return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
	    };
	    /**
	     * Returns the object as a HSLA object.
	     */
	    TinyColor.prototype.toHsl = function () {
	        var hsl = rgbToHsl(this.r, this.g, this.b);
	        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
	    };
	    /**
	     * Returns the hsla values interpolated into a string with the following format:
	     * "hsla(xxx, xxx, xxx, xx)".
	     */
	    TinyColor.prototype.toHslString = function () {
	        var hsl = rgbToHsl(this.r, this.g, this.b);
	        var h = Math.round(hsl.h * 360);
	        var s = Math.round(hsl.s * 100);
	        var l = Math.round(hsl.l * 100);
	        return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
	    };
	    /**
	     * Returns the hex value of the color.
	     * @param allow3Char will shorten hex value to 3 char if possible
	     */
	    TinyColor.prototype.toHex = function (allow3Char) {
	        if (allow3Char === void 0) { allow3Char = false; }
	        return rgbToHex(this.r, this.g, this.b, allow3Char);
	    };
	    /**
	     * Returns the hex value of the color -with a # prefixed.
	     * @param allow3Char will shorten hex value to 3 char if possible
	     */
	    TinyColor.prototype.toHexString = function (allow3Char) {
	        if (allow3Char === void 0) { allow3Char = false; }
	        return '#' + this.toHex(allow3Char);
	    };
	    /**
	     * Returns the hex 8 value of the color.
	     * @param allow4Char will shorten hex value to 4 char if possible
	     */
	    TinyColor.prototype.toHex8 = function (allow4Char) {
	        if (allow4Char === void 0) { allow4Char = false; }
	        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
	    };
	    /**
	     * Returns the hex 8 value of the color -with a # prefixed.
	     * @param allow4Char will shorten hex value to 4 char if possible
	     */
	    TinyColor.prototype.toHex8String = function (allow4Char) {
	        if (allow4Char === void 0) { allow4Char = false; }
	        return '#' + this.toHex8(allow4Char);
	    };
	    /**
	     * Returns the shorter hex value of the color depends on its alpha -with a # prefixed.
	     * @param allowShortChar will shorten hex value to 3 or 4 char if possible
	     */
	    TinyColor.prototype.toHexShortString = function (allowShortChar) {
	        if (allowShortChar === void 0) { allowShortChar = false; }
	        return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
	    };
	    /**
	     * Returns the object as a RGBA object.
	     */
	    TinyColor.prototype.toRgb = function () {
	        return {
	            r: Math.round(this.r),
	            g: Math.round(this.g),
	            b: Math.round(this.b),
	            a: this.a,
	        };
	    };
	    /**
	     * Returns the RGBA values interpolated into a string with the following format:
	     * "RGBA(xxx, xxx, xxx, xx)".
	     */
	    TinyColor.prototype.toRgbString = function () {
	        var r = Math.round(this.r);
	        var g = Math.round(this.g);
	        var b = Math.round(this.b);
	        return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
	    };
	    /**
	     * Returns the object as a RGBA object.
	     */
	    TinyColor.prototype.toPercentageRgb = function () {
	        var fmt = function (x) { return "".concat(Math.round(bound01(x, 255) * 100), "%"); };
	        return {
	            r: fmt(this.r),
	            g: fmt(this.g),
	            b: fmt(this.b),
	            a: this.a,
	        };
	    };
	    /**
	     * Returns the RGBA relative values interpolated into a string
	     */
	    TinyColor.prototype.toPercentageRgbString = function () {
	        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
	        return this.a === 1
	            ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)")
	            : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
	    };
	    /**
	     * The 'real' name of the color -if there is one.
	     */
	    TinyColor.prototype.toName = function () {
	        if (this.a === 0) {
	            return 'transparent';
	        }
	        if (this.a < 1) {
	            return false;
	        }
	        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
	        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
	            var _b = _a[_i], key = _b[0], value = _b[1];
	            if (hex === value) {
	                return key;
	            }
	        }
	        return false;
	    };
	    TinyColor.prototype.toString = function (format) {
	        var formatSet = Boolean(format);
	        format = format !== null && format !== void 0 ? format : this.format;
	        var formattedString = false;
	        var hasAlpha = this.a < 1 && this.a >= 0;
	        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
	        if (needsAlphaFormat) {
	            // Special case for "transparent", all other non-alpha formats
	            // will return rgba when there is transparency.
	            if (format === 'name' && this.a === 0) {
	                return this.toName();
	            }
	            return this.toRgbString();
	        }
	        if (format === 'rgb') {
	            formattedString = this.toRgbString();
	        }
	        if (format === 'prgb') {
	            formattedString = this.toPercentageRgbString();
	        }
	        if (format === 'hex' || format === 'hex6') {
	            formattedString = this.toHexString();
	        }
	        if (format === 'hex3') {
	            formattedString = this.toHexString(true);
	        }
	        if (format === 'hex4') {
	            formattedString = this.toHex8String(true);
	        }
	        if (format === 'hex8') {
	            formattedString = this.toHex8String();
	        }
	        if (format === 'name') {
	            formattedString = this.toName();
	        }
	        if (format === 'hsl') {
	            formattedString = this.toHslString();
	        }
	        if (format === 'hsv') {
	            formattedString = this.toHsvString();
	        }
	        return formattedString || this.toHexString();
	    };
	    TinyColor.prototype.toNumber = function () {
	        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	    };
	    TinyColor.prototype.clone = function () {
	        return new TinyColor(this.toString());
	    };
	    /**
	     * Lighten the color a given amount. Providing 100 will always return white.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.lighten = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        var hsl = this.toHsl();
	        hsl.l += amount / 100;
	        hsl.l = clamp01(hsl.l);
	        return new TinyColor(hsl);
	    };
	    /**
	     * Brighten the color a given amount, from 0 to 100.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.brighten = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        var rgb = this.toRgb();
	        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
	        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
	        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
	        return new TinyColor(rgb);
	    };
	    /**
	     * Darken the color a given amount, from 0 to 100.
	     * Providing 100 will always return black.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.darken = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        var hsl = this.toHsl();
	        hsl.l -= amount / 100;
	        hsl.l = clamp01(hsl.l);
	        return new TinyColor(hsl);
	    };
	    /**
	     * Mix the color with pure white, from 0 to 100.
	     * Providing 0 will do nothing, providing 100 will always return white.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.tint = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        return this.mix('white', amount);
	    };
	    /**
	     * Mix the color with pure black, from 0 to 100.
	     * Providing 0 will do nothing, providing 100 will always return black.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.shade = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        return this.mix('black', amount);
	    };
	    /**
	     * Desaturate the color a given amount, from 0 to 100.
	     * Providing 100 will is the same as calling greyscale
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.desaturate = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        var hsl = this.toHsl();
	        hsl.s -= amount / 100;
	        hsl.s = clamp01(hsl.s);
	        return new TinyColor(hsl);
	    };
	    /**
	     * Saturate the color a given amount, from 0 to 100.
	     * @param amount - valid between 1-100
	     */
	    TinyColor.prototype.saturate = function (amount) {
	        if (amount === void 0) { amount = 10; }
	        var hsl = this.toHsl();
	        hsl.s += amount / 100;
	        hsl.s = clamp01(hsl.s);
	        return new TinyColor(hsl);
	    };
	    /**
	     * Completely desaturates a color into greyscale.
	     * Same as calling `desaturate(100)`
	     */
	    TinyColor.prototype.greyscale = function () {
	        return this.desaturate(100);
	    };
	    /**
	     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	     * Values outside of this range will be wrapped into this range.
	     */
	    TinyColor.prototype.spin = function (amount) {
	        var hsl = this.toHsl();
	        var hue = (hsl.h + amount) % 360;
	        hsl.h = hue < 0 ? 360 + hue : hue;
	        return new TinyColor(hsl);
	    };
	    /**
	     * Mix the current color a given amount with another color, from 0 to 100.
	     * 0 means no mixing (return current color).
	     */
	    TinyColor.prototype.mix = function (color, amount) {
	        if (amount === void 0) { amount = 50; }
	        var rgb1 = this.toRgb();
	        var rgb2 = new TinyColor(color).toRgb();
	        var p = amount / 100;
	        var rgba = {
	            r: (rgb2.r - rgb1.r) * p + rgb1.r,
	            g: (rgb2.g - rgb1.g) * p + rgb1.g,
	            b: (rgb2.b - rgb1.b) * p + rgb1.b,
	            a: (rgb2.a - rgb1.a) * p + rgb1.a,
	        };
	        return new TinyColor(rgba);
	    };
	    TinyColor.prototype.analogous = function (results, slices) {
	        if (results === void 0) { results = 6; }
	        if (slices === void 0) { slices = 30; }
	        var hsl = this.toHsl();
	        var part = 360 / slices;
	        var ret = [this];
	        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
	            hsl.h = (hsl.h + part) % 360;
	            ret.push(new TinyColor(hsl));
	        }
	        return ret;
	    };
	    /**
	     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
	     */
	    TinyColor.prototype.complement = function () {
	        var hsl = this.toHsl();
	        hsl.h = (hsl.h + 180) % 360;
	        return new TinyColor(hsl);
	    };
	    TinyColor.prototype.monochromatic = function (results) {
	        if (results === void 0) { results = 6; }
	        var hsv = this.toHsv();
	        var h = hsv.h;
	        var s = hsv.s;
	        var v = hsv.v;
	        var res = [];
	        var modification = 1 / results;
	        while (results--) {
	            res.push(new TinyColor({ h: h, s: s, v: v }));
	            v = (v + modification) % 1;
	        }
	        return res;
	    };
	    TinyColor.prototype.splitcomplement = function () {
	        var hsl = this.toHsl();
	        var h = hsl.h;
	        return [
	            this,
	            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
	            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
	        ];
	    };
	    /**
	     * Compute how the color would appear on a background
	     */
	    TinyColor.prototype.onBackground = function (background) {
	        var fg = this.toRgb();
	        var bg = new TinyColor(background).toRgb();
	        var alpha = fg.a + bg.a * (1 - fg.a);
	        return new TinyColor({
	            r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
	            g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
	            b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
	            a: alpha,
	        });
	    };
	    /**
	     * Alias for `polyad(3)`
	     */
	    TinyColor.prototype.triad = function () {
	        return this.polyad(3);
	    };
	    /**
	     * Alias for `polyad(4)`
	     */
	    TinyColor.prototype.tetrad = function () {
	        return this.polyad(4);
	    };
	    /**
	     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
	     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
	     */
	    TinyColor.prototype.polyad = function (n) {
	        var hsl = this.toHsl();
	        var h = hsl.h;
	        var result = [this];
	        var increment = 360 / n;
	        for (var i = 1; i < n; i++) {
	            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
	        }
	        return result;
	    };
	    /**
	     * compare color vs current color
	     */
	    TinyColor.prototype.equals = function (color) {
	        return this.toRgbString() === new TinyColor(color).toRgbString();
	    };
	    return TinyColor;
	}());

	function clamp(min, max, x) {
	    if (x < min) {
	        return min;
	    }
	    else if (x > max) {
	        return max;
	    }
	    else {
	        return x;
	    }
	}
	let isMac;
	function checkModifiers(e, options = {}) {
	    if (isMac === undefined) {
	        isMac = navigator.userAgent.indexOf('Mac') != -1;
	    }
	    const target = {
	        shift: options.shift || false,
	        alt: options.alt || false,
	        ctrl: (!isMac && options.cmdOrCtrl) || false,
	        meta: (isMac && options.cmdOrCtrl) || false,
	    };
	    const pressed = {
	        shift: !!e.shiftKey,
	        alt: !!e.altKey,
	        ctrl: !!e.ctrlKey,
	        meta: !!e.metaKey,
	    };
	    return (pressed.shift === target.shift &&
	        pressed.alt === target.alt &&
	        pressed.ctrl === target.ctrl &&
	        pressed.meta === target.meta);
	}
	function checkShortcut(e, key, options = {}) {
	    if (e.key.toUpperCase() !== key.toUpperCase())
	        return false;
	    return checkModifiers(e, options);
	}

	class Color {
	    h;
	    s;
	    v;
	    a;
	    constructor(value) {
	        if (typeof value === 'string') {
	            const hsv = new TinyColor(value).toHsv();
	            this.h = hsv.h;
	            this.s = hsv.s;
	            this.v = hsv.v;
	            this.a = hsv.a;
	        }
	        else {
	            this.h = clamp(0, 360, value.h);
	            this.s = clamp(0, 1, value.s);
	            this.v = clamp(0, 1, value.v);
	            this.a = clamp(0, 1, value.a);
	        }
	    }
	    toHexString() {
	        return new TinyColor({ h: this.h, s: this.s, v: this.v }).toHexString();
	    }
	    toHex8String() {
	        return new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a }).toHex8String();
	    }
	}

	/* node_modules/color-picker-svelte/dist/ColorArea.svelte generated by Svelte v4.2.14 */

	function add_css$3(target) {
		append_styles(target, "svelte-1b85bye", ".color-area.svelte-1b85bye{width:100%;user-select:none;height:100%;position:relative;border-radius:4px;background:linear-gradient(transparent, #000000), linear-gradient(0.25turn, #ffffff, transparent), var(--hue-color)}.handle.svelte-1b85bye{width:14px;height:14px;position:absolute;transform:translate(-50%, -50%);border-radius:50%;border:2px solid #ffffff;box-shadow:0px 0px 3px 0px hsla(0, 0%, 0%, 0.5)}");
	}

	function create_fragment$6(ctx) {
		let div1;
		let div0;
		let div1_resize_listener;
		let mounted;
		let dispose;

		return {
			c() {
				div1 = element("div");
				div0 = element("div");
				attr(div0, "class", "handle svelte-1b85bye");
				set_style(div0, "top", (1 - /*color*/ ctx[0].v) * 100 + '%');
				set_style(div0, "left", /*color*/ ctx[0].s * 100 + '%');
				set_style(div0, "background-color", /*color*/ ctx[0].toHexString());
				attr(div1, "class", "color-area svelte-1b85bye");
				add_render_callback(() => /*div1_elementresize_handler*/ ctx[12].call(div1));
				set_style(div1, "--hue-color", `hsl(${Math.round(/*hue*/ ctx[2])},100%,50%)`);
			},
			m(target, anchor) {
				insert(target, div1, anchor);
				append(div1, div0);
				/*div1_binding*/ ctx[11](div1);
				div1_resize_listener = add_iframe_resize_listener(div1, /*div1_elementresize_handler*/ ctx[12].bind(div1));

				if (!mounted) {
					dispose = [
						listen(window, "mousemove", /*onMouse*/ ctx[4]),
						listen(window, "mouseup", /*mouseUp*/ ctx[6]),
						listen(window, "touchmove", /*onTouch*/ ctx[7]),
						listen(window, "touchend", /*touchEnd*/ ctx[9]),
						listen(div1, "mousedown", /*mouseDown*/ ctx[5]),
						listen(div1, "touchstart", prevent_default(/*touchStart*/ ctx[8]))
					];

					mounted = true;
				}
			},
			p(ctx, [dirty]) {
				if (dirty & /*color*/ 1) {
					set_style(div0, "top", (1 - /*color*/ ctx[0].v) * 100 + '%');
				}

				if (dirty & /*color*/ 1) {
					set_style(div0, "left", /*color*/ ctx[0].s * 100 + '%');
				}

				if (dirty & /*color*/ 1) {
					set_style(div0, "background-color", /*color*/ ctx[0].toHexString());
				}

				if (dirty & /*hue*/ 4) {
					set_style(div1, "--hue-color", `hsl(${Math.round(/*hue*/ ctx[2])},100%,50%)`);
				}
			},
			i: noop,
			o: noop,
			d(detaching) {
				if (detaching) {
					detach(div1);
				}

				/*div1_binding*/ ctx[11](null);
				div1_resize_listener();
				mounted = false;
				run_all(dispose);
			}
		};
	}

	function instance$6($$self, $$props, $$invalidate) {
		let { color } = $$props;
		let { clientHeight = 0 } = $$props;

		let { onInput = () => {
			
		} } = $$props;

		let hue = color.h;
		let parent;

		function pickPos(clientX, clientY) {
			const rect = parent.getBoundingClientRect();
			const x = clientX - rect.left;
			const y = clientY - rect.top;

			$$invalidate(0, color = new Color({
					h: hue,
					s: x / rect.width,
					v: 1 - y / rect.height,
					a: color.a
				}));

			onInput(color);
		}

		function onMouse(e) {
			if (mouseHold && e.target instanceof HTMLElement) {
				pickPos(e.clientX, e.clientY);
			}
		}

		let mouseHold = false;

		function mouseDown(e) {
			if (e.buttons === 1) {
				mouseHold = true;
				pickPos(e.clientX, e.clientY);
			}
		}

		function mouseUp() {
			mouseHold = false;
		}

		let touching = false;

		function onTouch(e) {
			if (touching) {
				pickPos(e.touches[0].clientX, e.touches[0].clientY);
			}
		}

		function touchStart(e) {
			if (e.touches.length === 1) {
				touching = true;
				pickPos(e.touches[0].clientX, e.touches[0].clientY);
			}
		}

		function touchEnd() {
			touching = false;
		}

		function div1_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				parent = $$value;
				$$invalidate(3, parent);
			});
		}

		function div1_elementresize_handler() {
			clientHeight = this.clientHeight;
			$$invalidate(1, clientHeight);
		}

		$$self.$$set = $$props => {
			if ('color' in $$props) $$invalidate(0, color = $$props.color);
			if ('clientHeight' in $$props) $$invalidate(1, clientHeight = $$props.clientHeight);
			if ('onInput' in $$props) $$invalidate(10, onInput = $$props.onInput);
		};

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*color*/ 1) {
				$$invalidate(2, hue = color.h);
			}
		};

		return [
			color,
			clientHeight,
			hue,
			parent,
			onMouse,
			mouseDown,
			mouseUp,
			onTouch,
			touchStart,
			touchEnd,
			onInput,
			div1_binding,
			div1_elementresize_handler
		];
	}

	class ColorArea extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$6, create_fragment$6, safe_not_equal, { color: 0, clientHeight: 1, onInput: 10 }, add_css$3);
		}

		get color() {
			return this.$$.ctx[0];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get clientHeight() {
			return this.$$.ctx[1];
		}

		set clientHeight(clientHeight) {
			this.$$set({ clientHeight });
			flush();
		}

		get onInput() {
			return this.$$.ctx[10];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}
	}

	create_custom_element(ColorArea, {"color":{},"clientHeight":{},"onInput":{}}, [], [], true);

	/* node_modules/color-picker-svelte/dist/Slider.svelte generated by Svelte v4.2.14 */

	function add_css$2(target) {
		append_styles(target, "svelte-imuds7", ".slider.svelte-imuds7.svelte-imuds7{padding:0rem 0.3rem;flex-shrink:0;user-select:none;box-sizing:border-box;position:relative}.slider-track.svelte-imuds7.svelte-imuds7{height:100%;width:0.5rem;border-radius:4px}.hue.svelte-imuds7 .slider-track.svelte-imuds7{background:linear-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%))}.alpha.svelte-imuds7 .slider-track.svelte-imuds7{background-image:repeating-conic-gradient(#bfbfbf 0 25%, #ffffff 0 50%);background-size:0.5rem 0.5rem;background-position:0 0, 0.25rem 0.25rem}.alpha.svelte-imuds7 .slider-track-overlay.svelte-imuds7{width:100%;height:100%;background-image:linear-gradient(to bottom, transparent 0%, var(--color) 100%);border-radius:inherit}.slider-handle.svelte-imuds7.svelte-imuds7{width:1rem;height:1rem;box-sizing:border-box;border-radius:100px;left:50%;transform:translate(-50%, -50%);position:absolute;border:2px solid #ffffff;box-shadow:0px 0px 3px 0px hsla(0, 0%, 0%, 0.5)}");
	}

	function create_fragment$5(ctx) {
		let div3;
		let div1;
		let t;
		let div2;
		let mounted;
		let dispose;

		return {
			c() {
				div3 = element("div");
				div1 = element("div");
				div1.innerHTML = `<div class="slider-track-overlay svelte-imuds7"></div>`;
				t = space();
				div2 = element("div");
				attr(div1, "class", "slider-track svelte-imuds7");
				attr(div2, "class", "slider-handle svelte-imuds7");
				set_style(div2, "top", /*value*/ ctx[0] / /*max*/ ctx[1] * 100 + '%');
				set_style(div2, "background-color", /*handleColor*/ ctx[3]);
				attr(div3, "role", "slider");
				attr(div3, "aria-valuenow", /*value*/ ctx[0]);
				attr(div3, "aria-valuemax", /*max*/ ctx[1]);
				attr(div3, "tabindex", "-1");
				attr(div3, "class", "slider svelte-imuds7");
				set_style(div3, "--color", /*color*/ ctx[2].toHexString());
				toggle_class(div3, "hue", /*style*/ ctx[4] === 'hue');
				toggle_class(div3, "alpha", /*style*/ ctx[4] === 'alpha');
			},
			m(target, anchor) {
				insert(target, div3, anchor);
				append(div3, div1);
				append(div3, t);
				append(div3, div2);
				/*div3_binding*/ ctx[13](div3);

				if (!mounted) {
					dispose = [
						listen(window, "mousemove", /*onMouse*/ ctx[6]),
						listen(window, "mouseup", /*mouseUp*/ ctx[8]),
						listen(window, "touchmove", /*onTouch*/ ctx[9]),
						listen(window, "touchend", /*touchEnd*/ ctx[11]),
						listen(div3, "mousedown", /*mouseDown*/ ctx[7]),
						listen(div3, "touchstart", prevent_default(/*touchStart*/ ctx[10]))
					];

					mounted = true;
				}
			},
			p(ctx, [dirty]) {
				if (dirty & /*value, max*/ 3) {
					set_style(div2, "top", /*value*/ ctx[0] / /*max*/ ctx[1] * 100 + '%');
				}

				if (dirty & /*handleColor*/ 8) {
					set_style(div2, "background-color", /*handleColor*/ ctx[3]);
				}

				if (dirty & /*value*/ 1) {
					attr(div3, "aria-valuenow", /*value*/ ctx[0]);
				}

				if (dirty & /*max*/ 2) {
					attr(div3, "aria-valuemax", /*max*/ ctx[1]);
				}

				if (dirty & /*color*/ 4) {
					set_style(div3, "--color", /*color*/ ctx[2].toHexString());
				}

				if (dirty & /*style*/ 16) {
					toggle_class(div3, "hue", /*style*/ ctx[4] === 'hue');
				}

				if (dirty & /*style*/ 16) {
					toggle_class(div3, "alpha", /*style*/ ctx[4] === 'alpha');
				}
			},
			i: noop,
			o: noop,
			d(detaching) {
				if (detaching) {
					detach(div3);
				}

				/*div3_binding*/ ctx[13](null);
				mounted = false;
				run_all(dispose);
			}
		};
	}

	function instance$5($$self, $$props, $$invalidate) {
		let { value } = $$props;
		let { max } = $$props;
		let { color } = $$props;
		let { handleColor = void 0 } = $$props;
		let { style } = $$props;

		let { onInput = () => {
			
		} } = $$props;

		let parent;

		function pickPos(clientY) {
			const rect = parent.getBoundingClientRect();
			const y = clientY - rect.top;
			const percentage = y / rect.height;
			$$invalidate(0, value = clamp(0, max, percentage * max));
			onInput(value);
		}

		function onMouse(e) {
			if (mouseHold && e.target instanceof HTMLElement) {
				pickPos(e.clientY);
			}
		}

		let mouseHold = false;

		function mouseDown(e) {
			if (e.buttons === 1) {
				mouseHold = true;
				pickPos(e.clientY);
			}
		}

		function mouseUp() {
			mouseHold = false;
		}

		let touching = false;

		function onTouch(e) {
			if (touching) {
				pickPos(e.touches[0].clientY);
			}
		}

		function touchStart(e) {
			if (e.touches.length === 1) {
				touching = true;
				pickPos(e.touches[0].clientY);
			}
		}

		function touchEnd() {
			touching = false;
		}

		function div3_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				parent = $$value;
				$$invalidate(5, parent);
			});
		}

		$$self.$$set = $$props => {
			if ('value' in $$props) $$invalidate(0, value = $$props.value);
			if ('max' in $$props) $$invalidate(1, max = $$props.max);
			if ('color' in $$props) $$invalidate(2, color = $$props.color);
			if ('handleColor' in $$props) $$invalidate(3, handleColor = $$props.handleColor);
			if ('style' in $$props) $$invalidate(4, style = $$props.style);
			if ('onInput' in $$props) $$invalidate(12, onInput = $$props.onInput);
		};

		return [
			value,
			max,
			color,
			handleColor,
			style,
			parent,
			onMouse,
			mouseDown,
			mouseUp,
			onTouch,
			touchStart,
			touchEnd,
			onInput,
			div3_binding
		];
	}

	class Slider extends SvelteComponent {
		constructor(options) {
			super();

			init(
				this,
				options,
				instance$5,
				create_fragment$5,
				safe_not_equal,
				{
					value: 0,
					max: 1,
					color: 2,
					handleColor: 3,
					style: 4,
					onInput: 12
				},
				add_css$2
			);
		}

		get value() {
			return this.$$.ctx[0];
		}

		set value(value) {
			this.$$set({ value });
			flush();
		}

		get max() {
			return this.$$.ctx[1];
		}

		set max(max) {
			this.$$set({ max });
			flush();
		}

		get color() {
			return this.$$.ctx[2];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get handleColor() {
			return this.$$.ctx[3];
		}

		set handleColor(handleColor) {
			this.$$set({ handleColor });
			flush();
		}

		get style() {
			return this.$$.ctx[4];
		}

		set style(style) {
			this.$$set({ style });
			flush();
		}

		get onInput() {
			return this.$$.ctx[12];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}
	}

	create_custom_element(Slider, {"value":{},"max":{},"color":{},"handleColor":{},"style":{},"onInput":{}}, [], [], true);

	/* node_modules/color-picker-svelte/dist/HueSlider.svelte generated by Svelte v4.2.14 */

	function create_fragment$4(ctx) {
		let slider;
		let updating_value;
		let current;

		function slider_value_binding(value) {
			/*slider_value_binding*/ ctx[2](value);
		}

		let slider_props = {
			color: /*color*/ ctx[0],
			max: 360,
			handleColor: "hsl(" + /*color*/ ctx[0].h + ",100%,50%)",
			style: "hue",
			onInput: /*onInput*/ ctx[1]
		};

		if (/*color*/ ctx[0].h !== void 0) {
			slider_props.value = /*color*/ ctx[0].h;
		}

		slider = new Slider({ props: slider_props });
		binding_callbacks.push(() => bind(slider, 'value', slider_value_binding));

		return {
			c() {
				create_component(slider.$$.fragment);
			},
			m(target, anchor) {
				mount_component(slider, target, anchor);
				current = true;
			},
			p(ctx, [dirty]) {
				const slider_changes = {};
				if (dirty & /*color*/ 1) slider_changes.color = /*color*/ ctx[0];
				if (dirty & /*color*/ 1) slider_changes.handleColor = "hsl(" + /*color*/ ctx[0].h + ",100%,50%)";
				if (dirty & /*onInput*/ 2) slider_changes.onInput = /*onInput*/ ctx[1];

				if (!updating_value && dirty & /*color*/ 1) {
					updating_value = true;
					slider_changes.value = /*color*/ ctx[0].h;
					add_flush_callback(() => updating_value = false);
				}

				slider.$set(slider_changes);
			},
			i(local) {
				if (current) return;
				transition_in(slider.$$.fragment, local);
				current = true;
			},
			o(local) {
				transition_out(slider.$$.fragment, local);
				current = false;
			},
			d(detaching) {
				destroy_component(slider, detaching);
			}
		};
	}

	function instance$4($$self, $$props, $$invalidate) {
		let { color } = $$props;

		let { onInput = () => {
			
		} } = $$props;

		function slider_value_binding(value) {
			if ($$self.$$.not_equal(color.h, value)) {
				color.h = value;
				$$invalidate(0, color);
			}
		}

		$$self.$$set = $$props => {
			if ('color' in $$props) $$invalidate(0, color = $$props.color);
			if ('onInput' in $$props) $$invalidate(1, onInput = $$props.onInput);
		};

		return [color, onInput, slider_value_binding];
	}

	class HueSlider extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$4, create_fragment$4, safe_not_equal, { color: 0, onInput: 1 });
		}

		get color() {
			return this.$$.ctx[0];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get onInput() {
			return this.$$.ctx[1];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}
	}

	create_custom_element(HueSlider, {"color":{},"onInput":{}}, [], [], true);

	/* node_modules/color-picker-svelte/dist/AlphaSlider.svelte generated by Svelte v4.2.14 */

	function create_fragment$3(ctx) {
		let slider;
		let updating_value;
		let current;

		function slider_value_binding(value) {
			/*slider_value_binding*/ ctx[2](value);
		}

		let slider_props = {
			color: /*color*/ ctx[0],
			max: 1,
			handleColor: "hsla(" + /*color*/ ctx[0].h + "," + /*color*/ ctx[0].s * 100 + "%," + /*color*/ ctx[0].v * 100 + "%," + /*color*/ ctx[0].a + ")",
			style: "alpha",
			onInput: /*onInput*/ ctx[1]
		};

		if (/*color*/ ctx[0].a !== void 0) {
			slider_props.value = /*color*/ ctx[0].a;
		}

		slider = new Slider({ props: slider_props });
		binding_callbacks.push(() => bind(slider, 'value', slider_value_binding));

		return {
			c() {
				create_component(slider.$$.fragment);
			},
			m(target, anchor) {
				mount_component(slider, target, anchor);
				current = true;
			},
			p(ctx, [dirty]) {
				const slider_changes = {};
				if (dirty & /*color*/ 1) slider_changes.color = /*color*/ ctx[0];
				if (dirty & /*color*/ 1) slider_changes.handleColor = "hsla(" + /*color*/ ctx[0].h + "," + /*color*/ ctx[0].s * 100 + "%," + /*color*/ ctx[0].v * 100 + "%," + /*color*/ ctx[0].a + ")";
				if (dirty & /*onInput*/ 2) slider_changes.onInput = /*onInput*/ ctx[1];

				if (!updating_value && dirty & /*color*/ 1) {
					updating_value = true;
					slider_changes.value = /*color*/ ctx[0].a;
					add_flush_callback(() => updating_value = false);
				}

				slider.$set(slider_changes);
			},
			i(local) {
				if (current) return;
				transition_in(slider.$$.fragment, local);
				current = true;
			},
			o(local) {
				transition_out(slider.$$.fragment, local);
				current = false;
			},
			d(detaching) {
				destroy_component(slider, detaching);
			}
		};
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { color } = $$props;

		let { onInput = () => {
			
		} } = $$props;

		function slider_value_binding(value) {
			if ($$self.$$.not_equal(color.a, value)) {
				color.a = value;
				$$invalidate(0, color);
			}
		}

		$$self.$$set = $$props => {
			if ('color' in $$props) $$invalidate(0, color = $$props.color);
			if ('onInput' in $$props) $$invalidate(1, onInput = $$props.onInput);
		};

		return [color, onInput, slider_value_binding];
	}

	class AlphaSlider extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$3, create_fragment$3, safe_not_equal, { color: 0, onInput: 1 });
		}

		get color() {
			return this.$$.ctx[0];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get onInput() {
			return this.$$.ctx[1];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}
	}

	create_custom_element(AlphaSlider, {"color":{},"onInput":{}}, [], [], true);

	/* node_modules/color-picker-svelte/dist/ColorPicker.svelte generated by Svelte v4.2.14 */

	function add_css$1(target) {
		append_styles(target, "svelte-70n9f7", ".color-picker.svelte-70n9f7{position:absolute;top:100%;left:0px;display:flex;border:1px solid hsla(222, 14%, 47%, 0.3);background-color:inherit;border-radius:5px;box-sizing:border-box;padding:12px;width:100%;height:210px;z-index:50}.color-picker.above.svelte-70n9f7{top:auto;bottom:100%}.color-picker.hidden.svelte-70n9f7{display:none}.color-picker.svelte-70n9f7 .slider{margin-left:12px}");
	}

	// (22:0) {#if isOpen}
	function create_if_block$1(ctx) {
		let div;
		let colorarea;
		let updating_color;
		let t0;
		let hueslider;
		let updating_color_1;
		let t1;
		let current;
		let mounted;
		let dispose;

		function colorarea_color_binding(value) {
			/*colorarea_color_binding*/ ctx[9](value);
		}

		let colorarea_props = { onInput: /*onInput*/ ctx[4] };

		if (/*color*/ ctx[0] !== void 0) {
			colorarea_props.color = /*color*/ ctx[0];
		}

		colorarea = new ColorArea({ props: colorarea_props });
		binding_callbacks.push(() => bind(colorarea, 'color', colorarea_color_binding));

		function hueslider_color_binding(value) {
			/*hueslider_color_binding*/ ctx[10](value);
		}

		let hueslider_props = { onInput: /*onInput*/ ctx[4] };

		if (/*color*/ ctx[0] !== void 0) {
			hueslider_props.color = /*color*/ ctx[0];
		}

		hueslider = new HueSlider({ props: hueslider_props });
		binding_callbacks.push(() => bind(hueslider, 'color', hueslider_color_binding));
		let if_block = /*showAlphaSlider*/ ctx[2] && create_if_block_1(ctx);

		return {
			c() {
				div = element("div");
				create_component(colorarea.$$.fragment);
				t0 = space();
				create_component(hueslider.$$.fragment);
				t1 = space();
				if (if_block) if_block.c();
				attr(div, "class", "color-picker svelte-70n9f7");

				toggle_class(div, "above", /*position*/ ctx[3] === Position.Auto
				? /*showAbove*/ ctx[6]
				: /*position*/ ctx[3] === Position.Above);

				toggle_class(div, "hidden", !/*isOpen*/ ctx[1]);
			},
			m(target, anchor) {
				insert(target, div, anchor);
				mount_component(colorarea, div, null);
				append(div, t0);
				mount_component(hueslider, div, null);
				append(div, t1);
				if (if_block) if_block.m(div, null);
				/*div_binding*/ ctx[12](div);
				current = true;

				if (!mounted) {
					dispose = listen(div, "touchstart", prevent_default(/*touchstart_handler*/ ctx[8]));
					mounted = true;
				}
			},
			p(ctx, dirty) {
				const colorarea_changes = {};
				if (dirty & /*onInput*/ 16) colorarea_changes.onInput = /*onInput*/ ctx[4];

				if (!updating_color && dirty & /*color*/ 1) {
					updating_color = true;
					colorarea_changes.color = /*color*/ ctx[0];
					add_flush_callback(() => updating_color = false);
				}

				colorarea.$set(colorarea_changes);
				const hueslider_changes = {};
				if (dirty & /*onInput*/ 16) hueslider_changes.onInput = /*onInput*/ ctx[4];

				if (!updating_color_1 && dirty & /*color*/ 1) {
					updating_color_1 = true;
					hueslider_changes.color = /*color*/ ctx[0];
					add_flush_callback(() => updating_color_1 = false);
				}

				hueslider.$set(hueslider_changes);

				if (/*showAlphaSlider*/ ctx[2]) {
					if (if_block) {
						if_block.p(ctx, dirty);

						if (dirty & /*showAlphaSlider*/ 4) {
							transition_in(if_block, 1);
						}
					} else {
						if_block = create_if_block_1(ctx);
						if_block.c();
						transition_in(if_block, 1);
						if_block.m(div, null);
					}
				} else if (if_block) {
					group_outros();

					transition_out(if_block, 1, 1, () => {
						if_block = null;
					});

					check_outros();
				}

				if (!current || dirty & /*position, showAbove*/ 72) {
					toggle_class(div, "above", /*position*/ ctx[3] === Position.Auto
					? /*showAbove*/ ctx[6]
					: /*position*/ ctx[3] === Position.Above);
				}

				if (!current || dirty & /*isOpen*/ 2) {
					toggle_class(div, "hidden", !/*isOpen*/ ctx[1]);
				}
			},
			i(local) {
				if (current) return;
				transition_in(colorarea.$$.fragment, local);
				transition_in(hueslider.$$.fragment, local);
				transition_in(if_block);
				current = true;
			},
			o(local) {
				transition_out(colorarea.$$.fragment, local);
				transition_out(hueslider.$$.fragment, local);
				transition_out(if_block);
				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(div);
				}

				destroy_component(colorarea);
				destroy_component(hueslider);
				if (if_block) if_block.d();
				/*div_binding*/ ctx[12](null);
				mounted = false;
				dispose();
			}
		};
	}

	// (32:4) {#if showAlphaSlider}
	function create_if_block_1(ctx) {
		let alphaslider;
		let updating_color;
		let current;

		function alphaslider_color_binding(value) {
			/*alphaslider_color_binding*/ ctx[11](value);
		}

		let alphaslider_props = { onInput: /*onInput*/ ctx[4] };

		if (/*color*/ ctx[0] !== void 0) {
			alphaslider_props.color = /*color*/ ctx[0];
		}

		alphaslider = new AlphaSlider({ props: alphaslider_props });
		binding_callbacks.push(() => bind(alphaslider, 'color', alphaslider_color_binding));

		return {
			c() {
				create_component(alphaslider.$$.fragment);
			},
			m(target, anchor) {
				mount_component(alphaslider, target, anchor);
				current = true;
			},
			p(ctx, dirty) {
				const alphaslider_changes = {};
				if (dirty & /*onInput*/ 16) alphaslider_changes.onInput = /*onInput*/ ctx[4];

				if (!updating_color && dirty & /*color*/ 1) {
					updating_color = true;
					alphaslider_changes.color = /*color*/ ctx[0];
					add_flush_callback(() => updating_color = false);
				}

				alphaslider.$set(alphaslider_changes);
			},
			i(local) {
				if (current) return;
				transition_in(alphaslider.$$.fragment, local);
				current = true;
			},
			o(local) {
				transition_out(alphaslider.$$.fragment, local);
				current = false;
			},
			d(detaching) {
				destroy_component(alphaslider, detaching);
			}
		};
	}

	function create_fragment$2(ctx) {
		let if_block_anchor;
		let current;
		let if_block = /*isOpen*/ ctx[1] && create_if_block$1(ctx);

		return {
			c() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},
			p(ctx, [dirty]) {
				if (/*isOpen*/ ctx[1]) {
					if (if_block) {
						if_block.p(ctx, dirty);

						if (dirty & /*isOpen*/ 2) {
							transition_in(if_block, 1);
						}
					} else {
						if_block = create_if_block$1(ctx);
						if_block.c();
						transition_in(if_block, 1);
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					group_outros();

					transition_out(if_block, 1, 1, () => {
						if_block = null;
					});

					check_outros();
				}
			},
			i(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o(local) {
				transition_out(if_block);
				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { color } = $$props;
		let { isOpen = false } = $$props;
		let { showAlphaSlider = false } = $$props;
		let { position = Position.Auto } = $$props;
		let { positioningContextElement } = $$props;
		let pickerEl;

		let { onInput = () => {
			
		} } = $$props;

		let showAbove = false;

		function touchstart_handler(event) {
			bubble.call(this, $$self, event);
		}

		function colorarea_color_binding(value) {
			color = value;
			$$invalidate(0, color);
		}

		function hueslider_color_binding(value) {
			color = value;
			$$invalidate(0, color);
		}

		function alphaslider_color_binding(value) {
			color = value;
			$$invalidate(0, color);
		}

		function div_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				pickerEl = $$value;
				$$invalidate(5, pickerEl);
			});
		}

		$$self.$$set = $$props => {
			if ('color' in $$props) $$invalidate(0, color = $$props.color);
			if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
			if ('showAlphaSlider' in $$props) $$invalidate(2, showAlphaSlider = $$props.showAlphaSlider);
			if ('position' in $$props) $$invalidate(3, position = $$props.position);
			if ('positioningContextElement' in $$props) $$invalidate(7, positioningContextElement = $$props.positioningContextElement);
			if ('onInput' in $$props) $$invalidate(4, onInput = $$props.onInput);
		};

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*color, onInput*/ 17) {
				(onInput());
			}

			if ($$self.$$.dirty & /*pickerEl, positioningContextElement*/ 160) {
				if (pickerEl && positioningContextElement) {
					$$invalidate(6, showAbove = shouldShowAbove(pickerEl, positioningContextElement));
				}
			}
		};

		return [
			color,
			isOpen,
			showAlphaSlider,
			position,
			onInput,
			pickerEl,
			showAbove,
			positioningContextElement,
			touchstart_handler,
			colorarea_color_binding,
			hueslider_color_binding,
			alphaslider_color_binding,
			div_binding
		];
	}

	class ColorPicker extends SvelteComponent {
		constructor(options) {
			super();

			init(
				this,
				options,
				instance$2,
				create_fragment$2,
				safe_not_equal,
				{
					color: 0,
					isOpen: 1,
					showAlphaSlider: 2,
					position: 3,
					positioningContextElement: 7,
					onInput: 4
				},
				add_css$1
			);
		}

		get color() {
			return this.$$.ctx[0];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get isOpen() {
			return this.$$.ctx[1];
		}

		set isOpen(isOpen) {
			this.$$set({ isOpen });
			flush();
		}

		get showAlphaSlider() {
			return this.$$.ctx[2];
		}

		set showAlphaSlider(showAlphaSlider) {
			this.$$set({ showAlphaSlider });
			flush();
		}

		get position() {
			return this.$$.ctx[3];
		}

		set position(position) {
			this.$$set({ position });
			flush();
		}

		get positioningContextElement() {
			return this.$$.ctx[7];
		}

		set positioningContextElement(positioningContextElement) {
			this.$$set({ positioningContextElement });
			flush();
		}

		get onInput() {
			return this.$$.ctx[4];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}
	}

	create_custom_element(ColorPicker, {"color":{},"isOpen":{"type":"Boolean"},"showAlphaSlider":{"type":"Boolean"},"position":{},"positioningContextElement":{},"onInput":{}}, [], [], true);

	/* node_modules/color-picker-svelte/dist/ColorInput.svelte generated by Svelte v4.2.14 */

	function add_css(target) {
		append_styles(target, "svelte-s8w54d", ".input.svelte-s8w54d.svelte-s8w54d{width:var(--input-width, 100%);display:flex;justify-items:center;align-items:center;box-sizing:border-box;border-radius:4px;padding:0px 10px;background:var(--picker-background, #ffffff);border:1px solid hsla(222, 14%, 47%, 0.3);box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.05);position:relative;user-select:none;outline:none;cursor:default}.input.disabled.svelte-s8w54d.svelte-s8w54d{opacity:0.5}.input.svelte-s8w54d.svelte-s8w54d:focus-within{border-color:#0269f7;box-shadow:0px 0px 0px 3px rgba(2, 105, 247, 0.4)}.text.svelte-s8w54d.svelte-s8w54d{position:relative}.title.svelte-s8w54d.svelte-s8w54d{position:absolute;top:0px;left:0px;width:100%;pointer-events:none;display:none}.title.show.svelte-s8w54d.svelte-s8w54d{display:block}.color-frame.svelte-s8w54d.svelte-s8w54d{pointer-events:none;height:20px;margin:8px 0px;margin-right:11px;width:38px;flex-shrink:0;border-radius:4px;box-sizing:border-box;box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.05);background-image:repeating-conic-gradient(#cccccc 0 25%, #ffffff 0 50%);background-size:0.5rem 0.5rem;background-position:0 0, 0.25rem 0.25rem}.color-frame.svelte-s8w54d .color-frame-color.svelte-s8w54d{width:100%;height:100%;box-sizing:border-box;border-radius:inherit;border:1px solid hsla(0, 0%, 100%, 0.3)}input.svelte-s8w54d.svelte-s8w54d{color:inherit;font-family:inherit;font-size:inherit;background-color:transparent;width:100%;outline:none;border:none;padding:0px;margin:0px;opacity:0;cursor:inherit;line-height:normal}input.svelte-s8w54d.svelte-s8w54d:focus{box-shadow:none}input.show.svelte-s8w54d.svelte-s8w54d{opacity:1;cursor:text}");
	}

	const get_default_slot_changes = dirty => ({ isOpen: dirty & /*isOpen*/ 2 });
	const get_default_slot_context = ctx => ({ isOpen: /*isOpen*/ ctx[1] });

	// (111:17)      
	function fallback_block(ctx) {
		let colorpicker;
		let updating_color;
		let current;

		function colorpicker_color_binding(value) {
			/*colorpicker_color_binding*/ ctx[23](value);
		}

		let colorpicker_props = {
			positioningContextElement: /*inputElement*/ ctx[10],
			onInput: /*onInput*/ ctx[5],
			isOpen: /*isOpen*/ ctx[1],
			position: /*position*/ ctx[7],
			showAlphaSlider: /*showAlphaSlider*/ ctx[3]
		};

		if (/*color*/ ctx[0] !== void 0) {
			colorpicker_props.color = /*color*/ ctx[0];
		}

		colorpicker = new ColorPicker({ props: colorpicker_props });
		binding_callbacks.push(() => bind(colorpicker, 'color', colorpicker_color_binding));

		return {
			c() {
				create_component(colorpicker.$$.fragment);
			},
			m(target, anchor) {
				mount_component(colorpicker, target, anchor);
				current = true;
			},
			p(ctx, dirty) {
				const colorpicker_changes = {};
				if (dirty & /*inputElement*/ 1024) colorpicker_changes.positioningContextElement = /*inputElement*/ ctx[10];
				if (dirty & /*onInput*/ 32) colorpicker_changes.onInput = /*onInput*/ ctx[5];
				if (dirty & /*isOpen*/ 2) colorpicker_changes.isOpen = /*isOpen*/ ctx[1];
				if (dirty & /*position*/ 128) colorpicker_changes.position = /*position*/ ctx[7];
				if (dirty & /*showAlphaSlider*/ 8) colorpicker_changes.showAlphaSlider = /*showAlphaSlider*/ ctx[3];

				if (!updating_color && dirty & /*color*/ 1) {
					updating_color = true;
					colorpicker_changes.color = /*color*/ ctx[0];
					add_flush_callback(() => updating_color = false);
				}

				colorpicker.$set(colorpicker_changes);
			},
			i(local) {
				if (current) return;
				transition_in(colorpicker.$$.fragment, local);
				current = true;
			},
			o(local) {
				transition_out(colorpicker.$$.fragment, local);
				current = false;
			},
			d(detaching) {
				destroy_component(colorpicker, detaching);
			}
		};
	}

	function create_fragment$1(ctx) {
		let div3;
		let div1;
		let div0;
		let t0;
		let div2;
		let input;
		let t1;
		let span;
		let t2;
		let t3;
		let div3_class_value;
		let div3_tabindex_value;
		let current;
		let mounted;
		let dispose;
		const default_slot_template = /*#slots*/ ctx[20].default;
		const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], get_default_slot_context);
		const default_slot_or_fallback = default_slot || fallback_block(ctx);

		return {
			c() {
				div3 = element("div");
				div1 = element("div");
				div0 = element("div");
				t0 = space();
				div2 = element("div");
				input = element("input");
				t1 = space();
				span = element("span");
				t2 = text(/*title*/ ctx[2]);
				t3 = space();
				if (default_slot_or_fallback) default_slot_or_fallback.c();
				attr(div0, "class", "color-frame-color svelte-s8w54d");
				set_style(div0, "background-color", /*color*/ ctx[0].toHex8String());
				attr(div1, "class", "color-frame svelte-s8w54d");
				attr(input, "type", "text");
				input.disabled = /*disabled*/ ctx[4];
				attr(input, "class", "svelte-s8w54d");
				toggle_class(input, "show", /*isOpen*/ ctx[1]);
				attr(span, "class", "title svelte-s8w54d");
				toggle_class(span, "show", !/*isOpen*/ ctx[1]);
				attr(div2, "class", "text svelte-s8w54d");
				attr(div3, "class", div3_class_value = "input " + /*classes*/ ctx[6] + " svelte-s8w54d");
				attr(div3, "tabindex", div3_tabindex_value = /*disabled*/ ctx[4] ? null : -1);
				attr(div3, "role", "button");
				attr(div3, "aria-label", "Open color picker");
				toggle_class(div3, "disabled", /*disabled*/ ctx[4]);
			},
			m(target, anchor) {
				insert(target, div3, anchor);
				append(div3, div1);
				append(div1, div0);
				append(div3, t0);
				append(div3, div2);
				append(div2, input);
				/*input_binding*/ ctx[21](input);
				set_input_value(input, /*text*/ ctx[8]);
				append(div2, t1);
				append(div2, span);
				append(span, t2);
				append(div3, t3);

				if (default_slot_or_fallback) {
					default_slot_or_fallback.m(div3, null);
				}

				/*div3_binding*/ ctx[24](div3);
				current = true;

				if (!mounted) {
					dispose = [
						listen(input, "input", /*input_input_handler*/ ctx[22]),
						listen(input, "input", /*textInputHandler*/ ctx[11]),
						listen(input, "focus", /*open*/ ctx[14]),
						action_destroyer(/*init*/ ctx[16].call(null, input)),
						listen(div3, "mousedown", /*openAndPreventDefault*/ ctx[15]),
						listen(div3, "keydown", /*keydown*/ ctx[13]),
						listen(div3, "focusout", /*focusout*/ ctx[12])
					];

					mounted = true;
				}
			},
			p(ctx, [dirty]) {
				if (dirty & /*color*/ 1) {
					set_style(div0, "background-color", /*color*/ ctx[0].toHex8String());
				}

				if (!current || dirty & /*disabled*/ 16) {
					input.disabled = /*disabled*/ ctx[4];
				}

				if (dirty & /*text*/ 256 && input.value !== /*text*/ ctx[8]) {
					set_input_value(input, /*text*/ ctx[8]);
				}

				if (!current || dirty & /*isOpen*/ 2) {
					toggle_class(input, "show", /*isOpen*/ ctx[1]);
				}

				if (!current || dirty & /*title*/ 4) set_data(t2, /*title*/ ctx[2]);

				if (!current || dirty & /*isOpen*/ 2) {
					toggle_class(span, "show", !/*isOpen*/ ctx[1]);
				}

				if (default_slot) {
					if (default_slot.p && (!current || dirty & /*$$scope, isOpen*/ 524290)) {
						update_slot_base(
							default_slot,
							default_slot_template,
							ctx,
							/*$$scope*/ ctx[19],
							!current
							? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
							: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, get_default_slot_changes),
							get_default_slot_context
						);
					}
				} else {
					if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*inputElement, onInput, isOpen, position, showAlphaSlider, color*/ 1195)) {
						default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
					}
				}

				if (!current || dirty & /*classes*/ 64 && div3_class_value !== (div3_class_value = "input " + /*classes*/ ctx[6] + " svelte-s8w54d")) {
					attr(div3, "class", div3_class_value);
				}

				if (!current || dirty & /*disabled*/ 16 && div3_tabindex_value !== (div3_tabindex_value = /*disabled*/ ctx[4] ? null : -1)) {
					attr(div3, "tabindex", div3_tabindex_value);
				}

				if (!current || dirty & /*classes, disabled*/ 80) {
					toggle_class(div3, "disabled", /*disabled*/ ctx[4]);
				}
			},
			i(local) {
				if (current) return;
				transition_in(default_slot_or_fallback, local);
				current = true;
			},
			o(local) {
				transition_out(default_slot_or_fallback, local);
				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(div3);
				}

				/*input_binding*/ ctx[21](null);
				if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
				/*div3_binding*/ ctx[24](null);
				mounted = false;
				run_all(dispose);
			}
		};
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		let { color } = $$props;
		let { title = "Color" } = $$props;
		let { isOpen = false } = $$props;
		let { showAlphaSlider = false } = $$props;
		let { disabled = false } = $$props;

		let { onInput = () => {
			
		} } = $$props;

		let { onClose = () => {
			
		} } = $$props;

		let skipCloseEvent = !isOpen;
		let { class: classes = "" } = $$props;

		function update(color2) {
			if (color2.h !== lastColor.h || color2.s !== lastColor.s || color2.v !== lastColor.v || color2.a !== lastColor.a) {
				$$invalidate(8, text = color2.a === 1
				? color2.toHexString()
				: color2.toHex8String());

				lastColor = new Color(color2);
			}
		}

		let text = color.a === 1
		? color.toHexString()
		: color.toHex8String();

		let lastColor = new Color(color);

		function textInputHandler() {
			const tinyColor = new TinyColor(text);

			if (tinyColor.isValid) {
				$$invalidate(0, color = new Color(tinyColor.toHsv()));
				lastColor = color;
			}

			onInput();
		}

		let parent;

		function focusout(e) {
			if (e.relatedTarget === null) {
				$$invalidate(1, isOpen = false);
			} else if (e.relatedTarget instanceof HTMLElement) {
				const stayingInParent = parent.contains(e.relatedTarget);

				if (!stayingInParent) {
					$$invalidate(1, isOpen = false);
				}
			}
		}

		function keydown(e) {
			if (checkShortcut(e, "Escape")) {
				$$invalidate(1, isOpen = false);
			} else if (checkShortcut(e, "Enter")) {
				open();
			}
		}

		let inputElement;
		let { position = Position.Auto } = $$props;

		function open() {
			if (!isOpen && !disabled) {
				$$invalidate(1, isOpen = true);
				inputElement.focus();
				inputElement.select();
				return true;
			}
		}

		function openAndPreventDefault(e) {
			if (open()) {
				e.preventDefault();
			}
		}

		function init(el) {
			if (document.activeElement === el) {
				$$invalidate(1, isOpen = true);
			}
		}

		function input_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				inputElement = $$value;
				$$invalidate(10, inputElement);
			});
		}

		function input_input_handler() {
			text = this.value;
			$$invalidate(8, text);
		}

		function colorpicker_color_binding(value) {
			color = value;
			$$invalidate(0, color);
		}

		function div3_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				parent = $$value;
				$$invalidate(9, parent);
			});
		}

		$$self.$$set = $$props => {
			if ('color' in $$props) $$invalidate(0, color = $$props.color);
			if ('title' in $$props) $$invalidate(2, title = $$props.title);
			if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
			if ('showAlphaSlider' in $$props) $$invalidate(3, showAlphaSlider = $$props.showAlphaSlider);
			if ('disabled' in $$props) $$invalidate(4, disabled = $$props.disabled);
			if ('onInput' in $$props) $$invalidate(5, onInput = $$props.onInput);
			if ('onClose' in $$props) $$invalidate(17, onClose = $$props.onClose);
			if ('class' in $$props) $$invalidate(6, classes = $$props.class);
			if ('position' in $$props) $$invalidate(7, position = $$props.position);
			if ('$$scope' in $$props) $$invalidate(19, $$scope = $$props.$$scope);
		};

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*isOpen, skipCloseEvent, onClose*/ 393218) {
				if (!isOpen) {
					if (!skipCloseEvent) {
						onClose();
					}

					$$invalidate(18, skipCloseEvent = false);
				}
			}

			if ($$self.$$.dirty & /*color*/ 1) {
				update(color);
			}
		};

		return [
			color,
			isOpen,
			title,
			showAlphaSlider,
			disabled,
			onInput,
			classes,
			position,
			text,
			parent,
			inputElement,
			textInputHandler,
			focusout,
			keydown,
			open,
			openAndPreventDefault,
			init,
			onClose,
			skipCloseEvent,
			$$scope,
			slots,
			input_binding,
			input_input_handler,
			colorpicker_color_binding,
			div3_binding
		];
	}

	class ColorInput extends SvelteComponent {
		constructor(options) {
			super();

			init(
				this,
				options,
				instance$1,
				create_fragment$1,
				safe_not_equal,
				{
					color: 0,
					title: 2,
					isOpen: 1,
					showAlphaSlider: 3,
					disabled: 4,
					onInput: 5,
					onClose: 17,
					class: 6,
					position: 7
				},
				add_css
			);
		}

		get color() {
			return this.$$.ctx[0];
		}

		set color(color) {
			this.$$set({ color });
			flush();
		}

		get title() {
			return this.$$.ctx[2];
		}

		set title(title) {
			this.$$set({ title });
			flush();
		}

		get isOpen() {
			return this.$$.ctx[1];
		}

		set isOpen(isOpen) {
			this.$$set({ isOpen });
			flush();
		}

		get showAlphaSlider() {
			return this.$$.ctx[3];
		}

		set showAlphaSlider(showAlphaSlider) {
			this.$$set({ showAlphaSlider });
			flush();
		}

		get disabled() {
			return this.$$.ctx[4];
		}

		set disabled(disabled) {
			this.$$set({ disabled });
			flush();
		}

		get onInput() {
			return this.$$.ctx[5];
		}

		set onInput(onInput) {
			this.$$set({ onInput });
			flush();
		}

		get onClose() {
			return this.$$.ctx[17];
		}

		set onClose(onClose) {
			this.$$set({ onClose });
			flush();
		}

		get class() {
			return this.$$.ctx[6];
		}

		set class(classes) {
			this.$$set({ class: classes });
			flush();
		}

		get position() {
			return this.$$.ctx[7];
		}

		set position(position) {
			this.$$set({ position });
			flush();
		}
	}

	create_custom_element(ColorInput, {"color":{},"title":{},"isOpen":{"type":"Boolean"},"showAlphaSlider":{"type":"Boolean"},"disabled":{"type":"Boolean"},"onInput":{},"onClose":{},"class":{},"position":{}}, ["default"], [], true);

	var Position;
	(function (Position) {
	    Position[Position["Auto"] = 0] = "Auto";
	    Position[Position["Above"] = 1] = "Above";
	    Position[Position["Below"] = 2] = "Below";
	})(Position || (Position = {}));
	/** Determines if `popupElement` should be shown above `positioningContextElement` */
	function shouldShowAbove(popupElement, positioningContextElement) {
	    const inputBounds = positioningContextElement.getBoundingClientRect();
	    const spaceAbove = inputBounds.top;
	    const spaceBelow = window.innerHeight - (inputBounds.top + inputBounds.height);
	    const enoughSpaceAbove = spaceAbove > popupElement.clientHeight;
	    const enoughSpaceBelow = spaceBelow > popupElement.clientHeight;
	    return !enoughSpaceBelow && enoughSpaceAbove;
	}

	/* Resources/Private/WebComponents/DomainColorPickers/DomainColorPickers.svelte generated by Svelte v4.2.14 */

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[14] = list[i];
		child_ctx[15] = list;
		child_ctx[16] = i;
		return child_ctx;
	}

	// (71:0) {#if conf.placeholder !== undefined}
	function create_if_block(ctx) {
		let div10;
		let style;
		let t1;
		let input0;
		let t2;
		let div9;
		let span0;
		let t3_value = /*conf*/ ctx[0].description + "";
		let t3;
		let t4;
		let div4;
		let div3;
		let div2;
		let div1;
		let div0;
		let input1;
		let input1_placeholder_value;
		let t5;
		let span1;

		let t6_value = (/*validInput*/ ctx[3] == true || /*domainName*/ ctx[1].length == 0
		? ""
		: /*conf*/ ctx[0].regexpError) + "";

		let t6;
		let t7;
		let div8;
		let div7;
		let div6;
		let div5;
		let button;
		let t8_value = /*conf*/ ctx[0].buttonLabel + "";
		let t8;
		let button_disabled_value;
		let t9;
		let current;
		let mounted;
		let dispose;
		let each_value = ensure_array_like(Array.from(/*colors*/ ctx[2]));
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		const out = i => transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

		return {
			c() {
				div10 = element("div");
				style = element("style");
				style.textContent = ".svelte-s8w54d {\r\n                height : 84%;\r\n            }\r\n            .input.svelte-s8w54d.svelte-s8w54d  {\r\n\r\n                background-color: #fefefe;\r\n                background-clip: padding-box;\r\n                border: var(--bs-border-width) solid #bbb;\r\n                border-radius: var(--bs-border-radius);\r\n                box-shadow: var(--bs-box-shadow-inset);\r\n                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;\r\n            }\r\n\r\n            .input-group .btn {\r\n                height: 105%;\r\n            }\r\n            .svelte-s8w54d .show {\r\n                padding-top: 5px;\r\n            }\r\n            .svelte-s8w54d:focus-within{\r\n                color: #333;\r\n                background-color: #fefefe;\r\n                border-color: #80bcf3;\r\n                outline: 0;\r\n                box-shadow: var(--bs-box-shadow-inset), 0 0 0 .25rem rgba(0, 120, 230, .25);\r\n            }\r\n            .input-element {\r\n                margin-right : 7px;\r\n            }";
				t1 = space();
				input0 = element("input");
				t2 = space();
				div9 = element("div");
				span0 = element("span");
				t3 = text(t3_value);
				t4 = space();
				div4 = element("div");
				div3 = element("div");
				div2 = element("div");
				div1 = element("div");
				div0 = element("div");
				input1 = element("input");
				t5 = space();
				span1 = element("span");
				t6 = text(t6_value);
				t7 = space();
				div8 = element("div");
				div7 = element("div");
				div6 = element("div");
				div5 = element("div");
				button = element("button");
				t8 = text(t8_value);
				t9 = space();

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr(input0, "type", "hidden");
				attr(input0, "name", "data[tx_qc_be_domain_color]");
				attr(input0, "id", "field_tx_qc_be_domain_color");
				attr(input0, "class", "d-none");
				attr(span0, "class", "text-muted");
				attr(input1, "id", "new-domain");
				attr(input1, "autocomplete", "off");
				attr(input1, "placeholder", input1_placeholder_value = /*conf*/ ctx[0].placeholder);
				attr(input1, "class", "new-domain form-control mb-2");
				attr(span1, "class", "error-message");
				set_style(span1, "color", "red");
				attr(div0, "class", "form-wizards-element");
				attr(div1, "class", "form-wizards-wrap");
				attr(div2, "class", "form-control-wrap");
				attr(div3, "class", "formengine-field-item t3js-formengine-field-item ");
				attr(div4, "class", "form-group t3js-formengine-validation-marker t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4");
				button.disabled = button_disabled_value = /*validInput*/ ctx[3] == false;
				attr(button, "class", "btn btn-default");
				attr(div5, "class", "btn-group");
				attr(div6, "class", "form-control-wrap");
				attr(div7, "class", "formengine-field-item t3js-formengine-field-item ");
				attr(div8, "class", "form-group t3js-formengine-validation-marker t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4");
				attr(div9, "class", "row");
			},
			m(target, anchor) {
				insert(target, div10, anchor);
				append(div10, style);
				append(div10, t1);
				append(div10, input0);
				set_input_value(input0, /*domainColorsJson*/ ctx[4]);
				append(div10, t2);
				append(div10, div9);
				append(div9, span0);
				append(span0, t3);
				append(div9, t4);
				append(div9, div4);
				append(div4, div3);
				append(div3, div2);
				append(div2, div1);
				append(div1, div0);
				append(div0, input1);
				set_input_value(input1, /*domainName*/ ctx[1]);
				append(div0, t5);
				append(div0, span1);
				append(span1, t6);
				append(div9, t7);
				append(div9, div8);
				append(div8, div7);
				append(div7, div6);
				append(div6, div5);
				append(div5, button);
				append(button, t8);
				append(div10, t9);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(div10, null);
					}
				}

				current = true;

				if (!mounted) {
					dispose = [
						listen(input0, "input", /*input0_input_handler*/ ctx[8]),
						listen(input1, "input", /*input1_input_handler*/ ctx[9]),
						listen(button, "click", /*addNewDomain*/ ctx[5])
					];

					mounted = true;
				}
			},
			p(ctx, dirty) {
				if (dirty & /*domainColorsJson*/ 16) {
					set_input_value(input0, /*domainColorsJson*/ ctx[4]);
				}

				if ((!current || dirty & /*conf*/ 1) && t3_value !== (t3_value = /*conf*/ ctx[0].description + "")) set_data(t3, t3_value);

				if (!current || dirty & /*conf*/ 1 && input1_placeholder_value !== (input1_placeholder_value = /*conf*/ ctx[0].placeholder)) {
					attr(input1, "placeholder", input1_placeholder_value);
				}

				if (dirty & /*domainName*/ 2 && input1.value !== /*domainName*/ ctx[1]) {
					set_input_value(input1, /*domainName*/ ctx[1]);
				}

				if ((!current || dirty & /*validInput, domainName, conf*/ 11) && t6_value !== (t6_value = (/*validInput*/ ctx[3] == true || /*domainName*/ ctx[1].length == 0
				? ""
				: /*conf*/ ctx[0].regexpError) + "")) set_data(t6, t6_value);

				if ((!current || dirty & /*conf*/ 1) && t8_value !== (t8_value = /*conf*/ ctx[0].buttonLabel + "")) set_data(t8, t8_value);

				if (!current || dirty & /*validInput*/ 8 && button_disabled_value !== (button_disabled_value = /*validInput*/ ctx[3] == false)) {
					button.disabled = button_disabled_value;
				}

				if (dirty & /*deleteDomainColor, event, Array, colors*/ 68) {
					each_value = ensure_array_like(Array.from(/*colors*/ ctx[2]));
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
							transition_in(each_blocks[i], 1);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							transition_in(each_blocks[i], 1);
							each_blocks[i].m(div10, null);
						}
					}

					group_outros();

					for (i = each_value.length; i < each_blocks.length; i += 1) {
						out(i);
					}

					check_outros();
				}
			},
			i(local) {
				if (current) return;

				for (let i = 0; i < each_value.length; i += 1) {
					transition_in(each_blocks[i]);
				}

				current = true;
			},
			o(local) {
				each_blocks = each_blocks.filter(Boolean);

				for (let i = 0; i < each_blocks.length; i += 1) {
					transition_out(each_blocks[i]);
				}

				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(div10);
				}

				destroy_each(each_blocks, detaching);
				mounted = false;
				run_all(dispose);
			}
		};
	}

	// (146:8) {#each Array.from(colors) as color, index}
	function create_each_block(ctx) {
		let div13;
		let div2;
		let div1;
		let div0;
		let input;
		let t0;
		let div7;
		let div6;
		let div5;
		let div4;
		let div3;
		let colorinput;
		let updating_color;
		let t1;
		let div12;
		let div11;
		let div10;
		let div9;
		let div8;
		let button;
		let t2;
		let current;
		let mounted;
		let dispose;

		function input_input_handler() {
			/*input_input_handler*/ ctx[10].call(input, /*each_value*/ ctx[15], /*index*/ ctx[16]);
		}

		function colorinput_color_binding(value) {
			/*colorinput_color_binding*/ ctx[11](value, /*index*/ ctx[16]);
		}

		let colorinput_props = { showAlphaSlider: true };

		if (/*colors*/ ctx[2][/*index*/ ctx[16]].color !== void 0) {
			colorinput_props.color = /*colors*/ ctx[2][/*index*/ ctx[16]].color;
		}

		colorinput = new ColorInput({ props: colorinput_props });
		binding_callbacks.push(() => bind(colorinput, 'color', colorinput_color_binding));

		function click_handler() {
			return /*click_handler*/ ctx[12](/*color*/ ctx[14]);
		}

		return {
			c() {
				div13 = element("div");
				div2 = element("div");
				div1 = element("div");
				div0 = element("div");
				input = element("input");
				t0 = space();
				div7 = element("div");
				div6 = element("div");
				div5 = element("div");
				div4 = element("div");
				div3 = element("div");
				create_component(colorinput.$$.fragment);
				t1 = space();
				div12 = element("div");
				div11 = element("div");
				div10 = element("div");
				div9 = element("div");
				div8 = element("div");
				button = element("button");
				button.innerHTML = `<span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete" data-identifier="actions-edit-delete"><span class="icon-markup"><svg class="icon-color" role="img"><use xlink:href="/typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/actions.svg#actions-delete"></use></svg></span></span>`;
				t2 = space();
				attr(input, "type", "text");
				attr(input, "class", "edit form-control");
				input.disabled = "disabled";
				attr(div0, "class", "form-wizards-element pr-2");
				attr(div1, "class", "form-wizards-wrap");
				attr(div2, "class", "form-control-wrap input-element");
				attr(div3, "class", "form-wizards-element");
				attr(div4, "class", "form-wizards-wrap");
				attr(div5, "class", "form-control-wrap input-element");
				set_style(div5, "max-width", "126px");
				attr(div6, "class", "formengine-field-item t3js-formengine-field-item");
				attr(div7, "class", "t3js-formengine-validation-marker");
				attr(button, "class", "btn btn-default t3js-editform-delete-record");
				attr(div8, "class", "form-wizards-element");
				attr(div9, "class", "form-wizards-wrap");
				attr(div10, "class", "form-control-wrap input-element");
				attr(div11, "class", "formengine-field-item t3js-formengine-field-item");
				attr(div12, "class", "t3js-formengine-validation-marker checkbox-column col-md-2 col-sm-3");
				attr(div13, "class", "d-flex mb-3");
			},
			m(target, anchor) {
				insert(target, div13, anchor);
				append(div13, div2);
				append(div2, div1);
				append(div1, div0);
				append(div0, input);
				set_input_value(input, /*color*/ ctx[14].domain);
				append(div13, t0);
				append(div13, div7);
				append(div7, div6);
				append(div6, div5);
				append(div5, div4);
				append(div4, div3);
				mount_component(colorinput, div3, null);
				append(div13, t1);
				append(div13, div12);
				append(div12, div11);
				append(div11, div10);
				append(div10, div9);
				append(div9, div8);
				append(div8, button);
				append(div13, t2);
				current = true;

				if (!mounted) {
					dispose = [
						listen(input, "input", input_input_handler),
						listen(button, "click", click_handler)
					];

					mounted = true;
				}
			},
			p(new_ctx, dirty) {
				ctx = new_ctx;

				if (dirty & /*Array, colors*/ 4 && input.value !== /*color*/ ctx[14].domain) {
					set_input_value(input, /*color*/ ctx[14].domain);
				}

				const colorinput_changes = {};

				if (!updating_color && dirty & /*colors*/ 4) {
					updating_color = true;
					colorinput_changes.color = /*colors*/ ctx[2][/*index*/ ctx[16]].color;
					add_flush_callback(() => updating_color = false);
				}

				colorinput.$set(colorinput_changes);
			},
			i(local) {
				if (current) return;
				transition_in(colorinput.$$.fragment, local);
				current = true;
			},
			o(local) {
				transition_out(colorinput.$$.fragment, local);
				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(div13);
				}

				destroy_component(colorinput);
				mounted = false;
				run_all(dispose);
			}
		};
	}

	function create_fragment(ctx) {
		let if_block_anchor;
		let current;
		let if_block = /*conf*/ ctx[0].placeholder !== undefined && create_if_block(ctx);

		return {
			c() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},
			p(ctx, [dirty]) {
				if (/*conf*/ ctx[0].placeholder !== undefined) {
					if (if_block) {
						if_block.p(ctx, dirty);

						if (dirty & /*conf*/ 1) {
							transition_in(if_block, 1);
						}
					} else {
						if_block = create_if_block(ctx);
						if_block.c();
						transition_in(if_block, 1);
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					group_outros();

					transition_out(if_block, 1, 1, () => {
						if_block = null;
					});

					check_outros();
				}
			},
			i(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o(local) {
				transition_out(if_block);
				current = false;
			},
			d(detaching) {
				if (detaching) {
					detach(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};
	}

	let domainNameRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

	function instance($$self, $$props, $$invalidate) {
		let validInput;
		let colors;
		let { domainColors = [], conf = {} } = $$props;
		let domainName = '';
		let domainColorsJson = '{}';

		function addNewDomain(e) {
			e.preventDefault();

			colors.push({
				'domain': domainName,
				'color': new Color("#CCC")
			});

			$$invalidate(2, colors = [...colors]);

			domainColors.push({
				'domain': domainName,
				color: '#CCC',
				errorClass: ''
			});

			$$invalidate(1, domainName = '');
			$$invalidate(4, domainColorsJson = JSON.stringify(domainColors));
			($$invalidate(2, colors), $$invalidate(7, domainColors));
		}

		function deleteDomainColor(event, domainColor) {
			event.preventDefault();
			const targetIndex = colors.findIndex(item => item.color !== domainColor.color.toHexString());

			if (targetIndex !== -1) {
				colors.splice(targetIndex, 1);
			}

			$$invalidate(7, domainColors = [
				...domainColors.filter(item => item.color !== domainColor.color.toHexString())
			]);

			$$invalidate(4, domainColorsJson = JSON.stringify(domainColors));
			($$invalidate(2, colors), $$invalidate(7, domainColors));
		}

		onMount(() => {
			domainColors.forEach((obj, index) => {
				if (obj.color !== undefined) {
					let color = {
						'domain': obj.domain,
						'color': new Color(obj.color)
					};

					colors.push(color);
					$$invalidate(2, colors = [...colors]);
				}
			});
		});

		function input0_input_handler() {
			domainColorsJson = this.value;
			(($$invalidate(4, domainColorsJson), $$invalidate(2, colors)), $$invalidate(7, domainColors));
		}

		function input1_input_handler() {
			domainName = this.value;
			$$invalidate(1, domainName);
		}

		function input_input_handler(each_value, index) {
			each_value[index].domain = this.value;
			($$invalidate(2, colors), $$invalidate(7, domainColors));
		}

		function colorinput_color_binding(value, index) {
			if ($$self.$$.not_equal(colors[index].color, value)) {
				colors[index].color = value;
				($$invalidate(2, colors), $$invalidate(7, domainColors));
			}
		}

		const click_handler = color => deleteDomainColor(event, color);

		$$self.$$set = $$props => {
			if ('domainColors' in $$props) $$invalidate(7, domainColors = $$props.domainColors);
			if ('conf' in $$props) $$invalidate(0, conf = $$props.conf);
		};

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*domainName, validInput*/ 10) {
				{
					$$invalidate(3, validInput = domainName.length > 0 && domainNameRegex.test(domainName));
					($$invalidate(3, validInput), $$invalidate(1, domainName));
				}
			}

			if ($$self.$$.dirty & /*domainName*/ 2) {
				domainName.trim() === "";
			}

			if ($$self.$$.dirty & /*colors, domainColors*/ 132) {
				{
					for (let i = 0; i < colors.length; i++) {
						$$invalidate(7, domainColors[i].color = colors[i].color.toHexString(), domainColors);
						$$invalidate(7, domainColors[i].domain = colors[i].domain, domainColors);
					}

					$$invalidate(4, domainColorsJson = JSON.stringify(domainColors));
					($$invalidate(2, colors), $$invalidate(7, domainColors));
				}
			}
		};

		$$invalidate(3, validInput = false);
		$$invalidate(2, colors = []);

		return [
			conf,
			domainName,
			colors,
			validInput,
			domainColorsJson,
			addNewDomain,
			deleteDomainColor,
			domainColors,
			input0_input_handler,
			input1_input_handler,
			input_input_handler,
			colorinput_color_binding,
			click_handler
		];
	}

	class DomainColorPickers extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance, create_fragment, safe_not_equal, { domainColors: 7, conf: 0 });
		}

		get domainColors() {
			return this.$$.ctx[7];
		}

		set domainColors(domainColors) {
			this.$$set({ domainColors });
			flush();
		}

		get conf() {
			return this.$$.ctx[0];
		}

		set conf(conf) {
			this.$$set({ conf });
			flush();
		}
	}

	customElements.define("qc-domain-color-pickers", create_custom_element(DomainColorPickers, {"domainColors":{"attribute":"domain-colors","type":"Object"},"conf":{"attribute":"data-conf","type":"Object"}}, [], [], false));

})();
