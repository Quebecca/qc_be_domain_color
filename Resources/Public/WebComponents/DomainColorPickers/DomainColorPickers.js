(function () {
	'use strict';

	// generated during release, do not modify

	const PUBLIC_VERSION = '5';

	if (typeof window !== 'undefined') {
		// @ts-expect-error
		((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
	}

	/** True if experimental.async=true */
	/** True if we're not certain that we only have Svelte 5 code in the compilation */
	let legacy_mode_flag = false;
	/** True if $inspect.trace is used */
	let tracing_mode_flag = false;

	function enable_legacy_mode_flag() {
		legacy_mode_flag = true;
	}

	enable_legacy_mode_flag();

	const EACH_ITEM_REACTIVE = 1;
	const EACH_INDEX_REACTIVE = 1 << 1;
	const EACH_ITEM_IMMUTABLE = 1 << 4;

	const PROPS_IS_IMMUTABLE = 1;
	const PROPS_IS_RUNES = 1 << 1;
	const PROPS_IS_UPDATED = 1 << 2;
	const PROPS_IS_BINDABLE = 1 << 3;
	const PROPS_IS_LAZY_INITIAL = 1 << 4;

	const TEMPLATE_FRAGMENT = 1;
	const TEMPLATE_USE_IMPORT_NODE = 1 << 1;

	const HYDRATION_START = '[';
	/** used to indicate that an `{:else}...` block was rendered */
	const HYDRATION_START_ELSE = '[!';
	/** used to indicate that a boundary's `failed` snippet was rendered on the server */
	const HYDRATION_START_FAILED = '[?';
	const HYDRATION_END = ']';
	const HYDRATION_ERROR = {};

	const UNINITIALIZED = Symbol();

	const NAMESPACE_HTML = 'http://www.w3.org/1999/xhtml';

	var DEV = false;

	// Store the references to globals in case someone tries to monkey patch these, causing the below
	// to de-opt (this occurs often when using popular extensions).
	var is_array = Array.isArray;
	var index_of = Array.prototype.indexOf;
	var includes = Array.prototype.includes;
	var array_from = Array.from;
	var object_keys = Object.keys;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var get_descriptors = Object.getOwnPropertyDescriptors;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;
	var is_extensible = Object.isExtensible;

	const noop = () => {};

	/** @param {Function} fn */
	function run(fn) {
		return fn();
	}

	/** @param {Array<() => void>} arr */
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i]();
		}
	}

	/**
	 * TODO replace with Promise.withResolvers once supported widely enough
	 * @template [T=void]
	 */
	function deferred() {
		/** @type {(value: T) => void} */
		var resolve;

		/** @type {(reason: any) => void} */
		var reject;

		/** @type {Promise<T>} */
		var promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});

		// @ts-expect-error
		return { promise, resolve, reject };
	}

	// General flags
	const DERIVED = 1 << 1;
	const EFFECT = 1 << 2;
	const RENDER_EFFECT = 1 << 3;
	/**
	 * An effect that does not destroy its child effects when it reruns.
	 * Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
	 */
	const MANAGED_EFFECT = 1 << 24;
	/**
	 * An effect that does not destroy its child effects when it reruns (like MANAGED_EFFECT).
	 * Runs eagerly as part of tree traversal or effect flushing.
	 */
	const BLOCK_EFFECT = 1 << 4;
	const BRANCH_EFFECT = 1 << 5;
	const ROOT_EFFECT = 1 << 6;
	const BOUNDARY_EFFECT = 1 << 7;
	/**
	 * Indicates that a reaction is connected to an effect root — either it is an effect,
	 * or it is a derived that is depended on by at least one effect. If a derived has
	 * no dependents, we can disconnect it from the graph, allowing it to either be
	 * GC'd or reconnected later if an effect comes to depend on it again
	 */
	const CONNECTED = 1 << 9;
	const CLEAN = 1 << 10;
	const DIRTY = 1 << 11;
	const MAYBE_DIRTY = 1 << 12;
	const INERT = 1 << 13;
	const DESTROYED = 1 << 14;
	/** Set once a reaction has run for the first time */
	const REACTION_RAN = 1 << 15;

	// Flags exclusive to effects
	/**
	 * 'Transparent' effects do not create a transition boundary.
	 * This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
	 */
	const EFFECT_TRANSPARENT = 1 << 16;
	const EAGER_EFFECT = 1 << 17;
	const HEAD_EFFECT = 1 << 18;
	const EFFECT_PRESERVED = 1 << 19;
	const USER_EFFECT = 1 << 20;
	const EFFECT_OFFSCREEN = 1 << 25;

	// Flags exclusive to deriveds
	/**
	 * Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
	 * Will be lifted during execution of the derived and during checking its dirty state (both are necessary
	 * because a derived might be checked but not executed).
	 */
	const WAS_MARKED = 1 << 16;

	// Flags used for async
	const REACTION_IS_UPDATING = 1 << 21;
	const ASYNC = 1 << 22;

	const ERROR_VALUE = 1 << 23;

	const STATE_SYMBOL = Symbol('$state');
	const LEGACY_PROPS = Symbol('legacy props');
	const LOADING_ATTR_SYMBOL = Symbol('');

	/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
	const STALE_REACTION = new (class StaleReactionError extends Error {
		name = 'StaleReactionError';
		message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
	})();

	const IS_XHTML =
		// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
		!!globalThis.document?.contentType &&
		/* @__PURE__ */ globalThis.document.contentType.includes('xml');
	const TEXT_NODE = 3;
	const COMMENT_NODE = 8;

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * `%name%(...)` can only be used during component initialisation
	 * @param {string} name
	 * @returns {never}
	 */
	function lifecycle_outside_component(name) {
		{
			throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
		}
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
	 * @returns {never}
	 */
	function async_derived_orphan() {
		{
			throw new Error(`https://svelte.dev/e/async_derived_orphan`);
		}
	}

	/**
	 * Keyed each block has duplicate key `%value%` at indexes %a% and %b%
	 * @param {string} a
	 * @param {string} b
	 * @param {string | undefined | null} [value]
	 * @returns {never}
	 */
	function each_key_duplicate(a, b, value) {
		{
			throw new Error(`https://svelte.dev/e/each_key_duplicate`);
		}
	}

	/**
	 * `%rune%` cannot be used inside an effect cleanup function
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_in_teardown(rune) {
		{
			throw new Error(`https://svelte.dev/e/effect_in_teardown`);
		}
	}

	/**
	 * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
	 * @returns {never}
	 */
	function effect_in_unowned_derived() {
		{
			throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
		}
	}

	/**
	 * `%rune%` can only be used inside an effect (e.g. during component initialisation)
	 * @param {string} rune
	 * @returns {never}
	 */
	function effect_orphan(rune) {
		{
			throw new Error(`https://svelte.dev/e/effect_orphan`);
		}
	}

	/**
	 * Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
	 * @returns {never}
	 */
	function effect_update_depth_exceeded() {
		{
			throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
		}
	}

	/**
	 * Failed to hydrate the application
	 * @returns {never}
	 */
	function hydration_failed() {
		{
			throw new Error(`https://svelte.dev/e/hydration_failed`);
		}
	}

	/**
	 * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	 * @param {string} key
	 * @returns {never}
	 */
	function props_invalid_value(key) {
		{
			throw new Error(`https://svelte.dev/e/props_invalid_value`);
		}
	}

	/**
	 * Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
	 * @returns {never}
	 */
	function state_descriptors_fixed() {
		{
			throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
		}
	}

	/**
	 * Cannot set prototype of `$state` object
	 * @returns {never}
	 */
	function state_prototype_fixed() {
		{
			throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
		}
	}

	/**
	 * Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
	 * @returns {never}
	 */
	function state_unsafe_mutation() {
		{
			throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
		}
	}

	/**
	 * A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
	 * @returns {never}
	 */
	function svelte_boundary_reset_onerror() {
		{
			throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
		}
	}

	/* This file is generated by scripts/process-messages/index.js. Do not edit! */


	/**
	 * Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
	 * @param {string | undefined | null} [location]
	 */
	function hydration_mismatch(location) {
		{
			console.warn(`https://svelte.dev/e/hydration_mismatch`);
		}
	}

	/**
	 * A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
	 */
	function svelte_boundary_reset_noop() {
		{
			console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
		}
	}

	/** @import { TemplateNode } from '#client' */


	/**
	 * Use this variable to guard everything related to hydration code so it can be treeshaken out
	 * if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
	 */
	let hydrating = false;

	/** @param {boolean} value */
	function set_hydrating(value) {
		hydrating = value;
	}

	/**
	 * The node that is currently being hydrated. This starts out as the first node inside the opening
	 * <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
	 * When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
	 * time we leave the block it is the closing comment, which serves as the block's anchor.
	 * @type {TemplateNode}
	 */
	let hydrate_node;

	/** @param {TemplateNode | null} node */
	function set_hydrate_node(node) {
		if (node === null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}

		return (hydrate_node = node);
	}

	function hydrate_next() {
		return set_hydrate_node(get_next_sibling(hydrate_node));
	}

	/** @param {TemplateNode} node */
	function reset(node) {
		if (!hydrating) return;

		// If the node has remaining siblings, something has gone wrong
		if (get_next_sibling(hydrate_node) !== null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}

		hydrate_node = node;
	}

	function next(count = 1) {
		if (hydrating) {
			var i = count;
			var node = hydrate_node;

			while (i--) {
				node = /** @type {TemplateNode} */ (get_next_sibling(node));
			}

			hydrate_node = node;
		}
	}

	/**
	 * Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
	 * @param {boolean} remove
	 */
	function skip_nodes(remove = true) {
		var depth = 0;
		var node = hydrate_node;

		while (true) {
			if (node.nodeType === COMMENT_NODE) {
				var data = /** @type {Comment} */ (node).data;

				if (data === HYDRATION_END) {
					if (depth === 0) return node;
					depth -= 1;
				} else if (
					data === HYDRATION_START ||
					data === HYDRATION_START_ELSE ||
					// "[1", "[2", etc. for if blocks
					(data[0] === '[' && !isNaN(Number(data.slice(1))))
				) {
					depth += 1;
				}
			}

			var next = /** @type {TemplateNode} */ (get_next_sibling(node));
			if (remove) node.remove();
			node = next;
		}
	}

	/**
	 *
	 * @param {TemplateNode} node
	 */
	function read_hydration_instruction(node) {
		if (!node || node.nodeType !== COMMENT_NODE) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}

		return /** @type {Comment} */ (node).data;
	}

	/** @import { Equals } from '#client' */

	/** @type {Equals} */
	function equals(value) {
		return value === this.v;
	}

	/**
	 * @param {unknown} a
	 * @param {unknown} b
	 * @returns {boolean}
	 */
	function safe_not_equal(a, b) {
		return a != a
			? b == b
			: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
	}

	/** @type {Equals} */
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}

	/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */

	/** @type {ComponentContext | null} */
	let component_context = null;

	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
	}

	/**
	 * @param {Record<string, unknown>} props
	 * @param {any} runes
	 * @param {Function} [fn]
	 * @returns {void}
	 */
	function push(props, runes = false, fn) {
		component_context = {
			p: component_context,
			i: false,
			c: null,
			e: null,
			s: props,
			x: null,
			l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
		};
	}

	/**
	 * @template {Record<string, any>} T
	 * @param {T} [component]
	 * @returns {T}
	 */
	function pop(component) {
		var context = /** @type {ComponentContext} */ (component_context);
		var effects = context.e;

		if (effects !== null) {
			context.e = null;

			for (var fn of effects) {
				create_user_effect(fn);
			}
		}

		if (component !== undefined) {
			context.x = component;
		}

		context.i = true;

		component_context = context.p;

		return component ?? /** @type {T} */ ({});
	}

	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || (component_context !== null && component_context.l === null);
	}

	/** @type {Array<() => void>} */
	let micro_tasks = [];

	function run_micro_tasks() {
		var tasks = micro_tasks;
		micro_tasks = [];
		run_all(tasks);
	}

	/**
	 * @param {() => void} fn
	 */
	function queue_micro_task(fn) {
		if (micro_tasks.length === 0 && !is_flushing_sync) {
			var tasks = micro_tasks;
			queueMicrotask(() => {
				// If this is false, a flushSync happened in the meantime. Do _not_ run new scheduled microtasks in that case
				// as the ordering of microtasks would be broken at that point - consider this case:
				// - queue_micro_task schedules microtask A to flush task X
				// - synchronously after, flushSync runs, processing task X
				// - synchronously after, some other microtask B is scheduled, but not through queue_micro_task but for example a Promise.resolve() in user code
				// - synchronously after, queue_micro_task schedules microtask C to flush task Y
				// - one tick later, microtask A now resolves, flushing task Y before microtask B, which is incorrect
				// This if check prevents that race condition (that realistically will only happen in tests)
				if (tasks === micro_tasks) run_micro_tasks();
			});
		}

		micro_tasks.push(fn);
	}

	/**
	 * Synchronously run any queued tasks.
	 */
	function flush_tasks() {
		while (micro_tasks.length > 0) {
			run_micro_tasks();
		}
	}

	/** @import { Derived, Effect } from '#client' */
	/** @import { Boundary } from './dom/blocks/boundary.js' */

	/**
	 * @param {unknown} error
	 */
	function handle_error(error) {
		var effect = active_effect;

		// for unowned deriveds, don't throw until we read the value
		if (effect === null) {
			/** @type {Derived} */ (active_reaction).f |= ERROR_VALUE;
			return error;
		}

		// if the error occurred while creating this subtree, we let it
		// bubble up until it hits a boundary that can handle it, unless
		// it's an $effect in which case it doesn't run immediately
		if ((effect.f & REACTION_RAN) === 0 && (effect.f & EFFECT) === 0) {

			throw error;
		}

		// otherwise we bubble up the effect tree ourselves
		invoke_error_boundary(error, effect);
	}

	/**
	 * @param {unknown} error
	 * @param {Effect | null} effect
	 */
	function invoke_error_boundary(error, effect) {
		while (effect !== null) {
			if ((effect.f & BOUNDARY_EFFECT) !== 0) {
				if ((effect.f & REACTION_RAN) === 0) {
					// we are still creating the boundary effect
					throw error;
				}

				try {
					/** @type {Boundary} */ (effect.b).error(error);
					return;
				} catch (e) {
					error = e;
				}
			}

			effect = effect.parent;
		}

		throw error;
	}

	/** @import { Derived, Signal } from '#client' */

	const STATUS_MASK = -7169;

	/**
	 * @param {Signal} signal
	 * @param {number} status
	 */
	function set_signal_status(signal, status) {
		signal.f = (signal.f & STATUS_MASK) | status;
	}

	/**
	 * Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
	 * @param {Derived} derived
	 */
	function update_derived_status(derived) {
		// Only mark as MAYBE_DIRTY if disconnected and has dependencies.
		if ((derived.f & CONNECTED) !== 0 || derived.deps === null) {
			set_signal_status(derived, CLEAN);
		} else {
			set_signal_status(derived, MAYBE_DIRTY);
		}
	}

	/** @import { Derived, Effect, Value } from '#client' */

	/**
	 * @param {Value[] | null} deps
	 */
	function clear_marked(deps) {
		if (deps === null) return;

		for (const dep of deps) {
			if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
				continue;
			}

			dep.f ^= WAS_MARKED;

			clear_marked(/** @type {Derived} */ (dep).deps);
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {Set<Effect>} dirty_effects
	 * @param {Set<Effect>} maybe_dirty_effects
	 */
	function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
		if ((effect.f & DIRTY) !== 0) {
			dirty_effects.add(effect);
		} else if ((effect.f & MAYBE_DIRTY) !== 0) {
			maybe_dirty_effects.add(effect);
		}

		// Since we're not executing these effects now, we need to clear any WAS_MARKED flags
		// so that other batches can correctly reach these effects during their own traversal
		clear_marked(effect.deps);

		// mark as clean so they get scheduled if they depend on pending async state
		set_signal_status(effect, CLEAN);
	}

	/** @import { Fork } from 'svelte' */
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/** @import { Boundary } from '../dom/blocks/boundary' */

	/** @type {Set<Batch>} */
	const batches = new Set();

	/** @type {Batch | null} */
	let current_batch = null;

	/**
	 * This is needed to avoid overwriting inputs in non-async mode
	 * TODO 6.0 remove this, as non-async mode will go away
	 * @type {Batch | null}
	 */
	let previous_batch = null;

	/**
	 * When time travelling (i.e. working in one batch, while other batches
	 * still have ongoing work), we ignore the real values of affected
	 * signals in favour of their values within the batch
	 * @type {Map<Value, any> | null}
	 */
	let batch_values = null;

	// TODO this should really be a property of `batch`
	/** @type {Effect[]} */
	let queued_root_effects = [];

	/** @type {Effect | null} */
	let last_scheduled_effect = null;

	let is_flushing = false;
	let is_flushing_sync = false;

	class Batch {
		/**
		 * The current values of any sources that are updated in this batch
		 * They keys of this map are identical to `this.#previous`
		 * @type {Map<Source, any>}
		 */
		current = new Map();

		/**
		 * The values of any sources that are updated in this batch _before_ those updates took place.
		 * They keys of this map are identical to `this.#current`
		 * @type {Map<Source, any>}
		 */
		previous = new Map();

		/**
		 * When the batch is committed (and the DOM is updated), we need to remove old branches
		 * and append new ones by calling the functions added inside (if/each/key/etc) blocks
		 * @type {Set<() => void>}
		 */
		#commit_callbacks = new Set();

		/**
		 * If a fork is discarded, we need to destroy any effects that are no longer needed
		 * @type {Set<(batch: Batch) => void>}
		 */
		#discard_callbacks = new Set();

		/**
		 * The number of async effects that are currently in flight
		 */
		#pending = 0;

		/**
		 * The number of async effects that are currently in flight, _not_ inside a pending boundary
		 */
		#blocking_pending = 0;

		/**
		 * A deferred that resolves when the batch is committed, used with `settled()`
		 * TODO replace with Promise.withResolvers once supported widely enough
		 * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
		 */
		#deferred = null;

		/**
		 * Deferred effects (which run after async work has completed) that are DIRTY
		 * @type {Set<Effect>}
		 */
		#dirty_effects = new Set();

		/**
		 * Deferred effects that are MAYBE_DIRTY
		 * @type {Set<Effect>}
		 */
		#maybe_dirty_effects = new Set();

		/**
		 * A map of branches that still exist, but will be destroyed when this batch
		 * is committed — we skip over these during `process`.
		 * The value contains child effects that were dirty/maybe_dirty before being reset,
		 * so they can be rescheduled if the branch survives.
		 * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
		 */
		#skipped_branches = new Map();

		is_fork = false;

		#decrement_queued = false;

		#is_deferred() {
			return this.is_fork || this.#blocking_pending > 0;
		}

		/**
		 * Add an effect to the #skipped_branches map and reset its children
		 * @param {Effect} effect
		 */
		skip_effect(effect) {
			if (!this.#skipped_branches.has(effect)) {
				this.#skipped_branches.set(effect, { d: [], m: [] });
			}
		}

		/**
		 * Remove an effect from the #skipped_branches map and reschedule
		 * any tracked dirty/maybe_dirty child effects
		 * @param {Effect} effect
		 */
		unskip_effect(effect) {
			var tracked = this.#skipped_branches.get(effect);
			if (tracked) {
				this.#skipped_branches.delete(effect);

				for (var e of tracked.d) {
					set_signal_status(e, DIRTY);
					schedule_effect(e);
				}

				for (e of tracked.m) {
					set_signal_status(e, MAYBE_DIRTY);
					schedule_effect(e);
				}
			}
		}

		/**
		 *
		 * @param {Effect[]} root_effects
		 */
		process(root_effects) {
			queued_root_effects = [];

			this.apply();

			/** @type {Effect[]} */
			var effects = [];

			/** @type {Effect[]} */
			var render_effects = [];

			for (const root of root_effects) {
				this.#traverse_effect_tree(root, effects, render_effects);
				// Note: #traverse_effect_tree runs block effects eagerly, which can schedule effects,
				// which means queued_root_effects now may be filled again.

				// Helpful for debugging reactivity loss that has to do with branches being skipped:
				// log_inconsistent_branches(root);
			}

			if (this.#is_deferred()) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);

				for (const [e, t] of this.#skipped_branches) {
					reset_branch(e, t);
				}
			} else {
				// append/remove branches
				for (const fn of this.#commit_callbacks) fn();
				this.#commit_callbacks.clear();

				if (this.#pending === 0) {
					this.#commit();
				}

				// If sources are written to, then work needs to happen in a separate batch, else prior sources would be mixed with
				// newly updated sources, which could lead to infinite loops when effects run over and over again.
				previous_batch = this;
				current_batch = null;

				flush_queued_effects(render_effects);
				flush_queued_effects(effects);

				previous_batch = null;

				this.#deferred?.resolve();
			}

			batch_values = null;
		}

		/**
		 * Traverse the effect tree, executing effects or stashing
		 * them for later execution as appropriate
		 * @param {Effect} root
		 * @param {Effect[]} effects
		 * @param {Effect[]} render_effects
		 */
		#traverse_effect_tree(root, effects, render_effects) {
			root.f ^= CLEAN;

			var effect = root.first;

			while (effect !== null) {
				var flags = effect.f;
				var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
				var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;

				var skip = is_skippable_branch || (flags & INERT) !== 0 || this.#skipped_branches.has(effect);

				if (!skip && effect.fn !== null) {
					if (is_branch) {
						effect.f ^= CLEAN;
					} else if ((flags & EFFECT) !== 0) {
						effects.push(effect);
					} else if (is_dirty(effect)) {
						if ((flags & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect);
						update_effect(effect);
					}

					var child = effect.first;

					if (child !== null) {
						effect = child;
						continue;
					}
				}

				while (effect !== null) {
					var next = effect.next;

					if (next !== null) {
						effect = next;
						break;
					}

					effect = effect.parent;
				}
			}
		}

		/**
		 * @param {Effect[]} effects
		 */
		#defer_effects(effects) {
			for (var i = 0; i < effects.length; i += 1) {
				defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
			}
		}

		/**
		 * Associate a change to a given source with the current
		 * batch, noting its previous and current values
		 * @param {Source} source
		 * @param {any} value
		 */
		capture(source, value) {
			if (value !== UNINITIALIZED && !this.previous.has(source)) {
				this.previous.set(source, value);
			}

			// Don't save errors in `batch_values`, or they won't be thrown in `runtime.js#get`
			if ((source.f & ERROR_VALUE) === 0) {
				this.current.set(source, source.v);
				batch_values?.set(source, source.v);
			}
		}

		activate() {
			current_batch = this;
			this.apply();
		}

		deactivate() {
			// If we're not the current batch, don't deactivate,
			// else we could create zombie batches that are never flushed
			if (current_batch !== this) return;

			current_batch = null;
			batch_values = null;
		}

		flush() {
			this.activate();

			if (queued_root_effects.length > 0) {
				flush_effects();

				if (current_batch !== null && current_batch !== this) {
					// this can happen if a new batch was created during `flush_effects()`
					return;
				}
			} else if (this.#pending === 0) {
				this.process([]); // TODO this feels awkward
			}

			this.deactivate();
		}

		discard() {
			for (const fn of this.#discard_callbacks) fn(this);
			this.#discard_callbacks.clear();
		}

		#commit() {
			// If there are other pending batches, they now need to be 'rebased' —
			// in other words, we re-run block/async effects with the newly
			// committed state, unless the batch in question has a more
			// recent value for a given source
			if (batches.size > 1) {
				this.previous.clear();

				var previous_batch_values = batch_values;
				var is_earlier = true;

				for (const batch of batches) {
					if (batch === this) {
						is_earlier = false;
						continue;
					}

					/** @type {Source[]} */
					const sources = [];

					for (const [source, value] of this.current) {
						if (batch.current.has(source)) {
							if (is_earlier && value !== batch.current.get(source)) {
								// bring the value up to date
								batch.current.set(source, value);
							} else {
								// same value or later batch has more recent value,
								// no need to re-run these effects
								continue;
							}
						}

						sources.push(source);
					}

					if (sources.length === 0) {
						continue;
					}

					// Re-run async/block effects that depend on distinct values changed in both batches
					const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
					if (others.length > 0) {
						// Avoid running queued root effects on the wrong branch
						var prev_queued_root_effects = queued_root_effects;
						queued_root_effects = [];

						/** @type {Set<Value>} */
						const marked = new Set();
						/** @type {Map<Reaction, boolean>} */
						const checked = new Map();
						for (const source of sources) {
							mark_effects(source, others, marked, checked);
						}

						if (queued_root_effects.length > 0) {
							current_batch = batch;
							batch.apply();

							for (const root of queued_root_effects) {
								batch.#traverse_effect_tree(root, [], []);
							}

							// TODO do we need to do anything with the dummy effect arrays?

							batch.deactivate();
						}

						queued_root_effects = prev_queued_root_effects;
					}
				}

				current_batch = null;
				batch_values = previous_batch_values;
			}

			batches.delete(this);
		}

		/**
		 *
		 * @param {boolean} blocking
		 */
		increment(blocking) {
			this.#pending += 1;
			if (blocking) this.#blocking_pending += 1;
		}

		/**
		 *
		 * @param {boolean} blocking
		 */
		decrement(blocking) {
			this.#pending -= 1;
			if (blocking) this.#blocking_pending -= 1;

			if (this.#decrement_queued) return;
			this.#decrement_queued = true;

			queue_micro_task(() => {
				this.#decrement_queued = false;

				if (!this.#is_deferred()) {
					// we only reschedule previously-deferred effects if we expect
					// to be able to run them after processing the batch
					this.revive();
				} else if (queued_root_effects.length > 0) {
					// if other effects are scheduled, process the batch _without_
					// rescheduling the previously-deferred effects
					this.flush();
				}
			});
		}

		revive() {
			for (const e of this.#dirty_effects) {
				this.#maybe_dirty_effects.delete(e);
				set_signal_status(e, DIRTY);
				schedule_effect(e);
			}

			for (const e of this.#maybe_dirty_effects) {
				set_signal_status(e, MAYBE_DIRTY);
				schedule_effect(e);
			}

			this.flush();
		}

		/** @param {() => void} fn */
		oncommit(fn) {
			this.#commit_callbacks.add(fn);
		}

		/** @param {(batch: Batch) => void} fn */
		ondiscard(fn) {
			this.#discard_callbacks.add(fn);
		}

		settled() {
			return (this.#deferred ??= deferred()).promise;
		}

		static ensure() {
			if (current_batch === null) {
				const batch = (current_batch = new Batch());
				batches.add(current_batch);

				if (!is_flushing_sync) {
					queue_micro_task(() => {
						if (current_batch !== batch) {
							// a flushSync happened in the meantime
							return;
						}

						batch.flush();
					});
				}
			}

			return current_batch;
		}

		apply() {
			return;
		}
	}

	/**
	 * Synchronously flush any pending updates.
	 * Returns void if no callback is provided, otherwise returns the result of calling the callback.
	 * @template [T=void]
	 * @param {(() => T) | undefined} [fn]
	 * @returns {T}
	 */
	function flushSync(fn) {
		var was_flushing_sync = is_flushing_sync;
		is_flushing_sync = true;

		try {
			var result;

			if (fn) ;

			while (true) {
				flush_tasks();

				if (queued_root_effects.length === 0) {
					current_batch?.flush();

					// we need to check again, in case we just updated an `$effect.pending()`
					if (queued_root_effects.length === 0) {
						// this would be reset in `flush_effects()` but since we are early returning here,
						// we need to reset it here as well in case the first time there's 0 queued root effects
						last_scheduled_effect = null;

						return /** @type {T} */ (result);
					}
				}

				flush_effects();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
		}
	}

	function flush_effects() {
		is_flushing = true;

		var source_stacks = null;

		try {
			var flush_count = 0;

			while (queued_root_effects.length > 0) {
				var batch = Batch.ensure();

				if (flush_count++ > 1000) {
					var updates, entry; if (DEV) ;

					infinite_loop_guard();
				}

				batch.process(queued_root_effects);
				old_values.clear();

				if (DEV) ;
			}
		} finally {
			queued_root_effects = [];

			is_flushing = false;
			last_scheduled_effect = null;
		}
	}

	function infinite_loop_guard() {
		try {
			effect_update_depth_exceeded();
		} catch (error) {

			// Best effort: invoke the boundary nearest the most recent
			// effect and hope that it's relevant to the infinite loop
			invoke_error_boundary(error, last_scheduled_effect);
		}
	}

	/** @type {Set<Effect> | null} */
	let eager_block_effects = null;

	/**
	 * @param {Array<Effect>} effects
	 * @returns {void}
	 */
	function flush_queued_effects(effects) {
		var length = effects.length;
		if (length === 0) return;

		var i = 0;

		while (i < length) {
			var effect = effects[i++];

			if ((effect.f & (DESTROYED | INERT)) === 0 && is_dirty(effect)) {
				eager_block_effects = new Set();

				update_effect(effect);

				// Effects with no dependencies or teardown do not get added to the effect tree.
				// Deferred effects (e.g. `$effect(...)`) _are_ added to the tree because we
				// don't know if we need to keep them until they are executed. Doing the check
				// here (rather than in `update_effect`) allows us to skip the work for
				// immediate effects.
				if (
					effect.deps === null &&
					effect.first === null &&
					effect.nodes === null &&
					effect.teardown === null &&
					effect.ac === null
				) {
					// remove this effect from the graph
					unlink_effect(effect);
				}

				// If update_effect() has a flushSync() in it, we may have flushed another flush_queued_effects(),
				// which already handled this logic and did set eager_block_effects to null.
				if (eager_block_effects?.size > 0) {
					old_values.clear();

					for (const e of eager_block_effects) {
						// Skip eager effects that have already been unmounted
						if ((e.f & (DESTROYED | INERT)) !== 0) continue;

						// Run effects in order from ancestor to descendant, else we could run into nullpointers
						/** @type {Effect[]} */
						const ordered_effects = [e];
						let ancestor = e.parent;
						while (ancestor !== null) {
							if (eager_block_effects.has(ancestor)) {
								eager_block_effects.delete(ancestor);
								ordered_effects.push(ancestor);
							}
							ancestor = ancestor.parent;
						}

						for (let j = ordered_effects.length - 1; j >= 0; j--) {
							const e = ordered_effects[j];
							// Skip eager effects that have already been unmounted
							if ((e.f & (DESTROYED | INERT)) !== 0) continue;
							update_effect(e);
						}
					}

					eager_block_effects.clear();
				}
			}
		}

		eager_block_effects = null;
	}

	/**
	 * This is similar to `mark_reactions`, but it only marks async/block effects
	 * depending on `value` and at least one of the other `sources`, so that
	 * these effects can re-run after another batch has been committed
	 * @param {Value} value
	 * @param {Source[]} sources
	 * @param {Set<Value>} marked
	 * @param {Map<Reaction, boolean>} checked
	 */
	function mark_effects(value, sources, marked, checked) {
		if (marked.has(value)) return;
		marked.add(value);

		if (value.reactions !== null) {
			for (const reaction of value.reactions) {
				const flags = reaction.f;

				if ((flags & DERIVED) !== 0) {
					mark_effects(/** @type {Derived} */ (reaction), sources, marked, checked);
				} else if (
					(flags & (ASYNC | BLOCK_EFFECT)) !== 0 &&
					(flags & DIRTY) === 0 &&
					depends_on(reaction, sources, checked)
				) {
					set_signal_status(reaction, DIRTY);
					schedule_effect(/** @type {Effect} */ (reaction));
				}
			}
		}
	}

	/**
	 * @param {Reaction} reaction
	 * @param {Source[]} sources
	 * @param {Map<Reaction, boolean>} checked
	 */
	function depends_on(reaction, sources, checked) {
		const depends = checked.get(reaction);
		if (depends !== undefined) return depends;

		if (reaction.deps !== null) {
			for (const dep of reaction.deps) {
				if (includes.call(sources, dep)) {
					return true;
				}

				if ((dep.f & DERIVED) !== 0 && depends_on(/** @type {Derived} */ (dep), sources, checked)) {
					checked.set(/** @type {Derived} */ (dep), true);
					return true;
				}
			}
		}

		checked.set(reaction, false);

		return false;
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function schedule_effect(signal) {
		var effect = (last_scheduled_effect = signal);

		var boundary = effect.b;

		// defer render effects inside a pending boundary
		// TODO the `REACTION_RAN` check is only necessary because of legacy `$:` effects AFAICT — we can remove later
		if (
			boundary?.is_pending &&
			(signal.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 &&
			(signal.f & REACTION_RAN) === 0
		) {
			boundary.defer_effect(signal);
			return;
		}

		while (effect.parent !== null) {
			effect = effect.parent;
			var flags = effect.f;

			// if the effect is being scheduled because a parent (each/await/etc) block
			// updated an internal source, or because a branch is being unskipped,
			// bail out or we'll cause a second flush
			if (
				is_flushing &&
				effect === active_effect &&
				(flags & BLOCK_EFFECT) !== 0 &&
				(flags & HEAD_EFFECT) === 0 &&
				(flags & REACTION_RAN) !== 0
			) {
				return;
			}

			if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
				if ((flags & CLEAN) === 0) {
					// branch is already dirty, bail
					return;
				}

				effect.f ^= CLEAN;
			}
		}

		queued_root_effects.push(effect);
	}

	/**
	 * Mark all the effects inside a skipped branch CLEAN, so that
	 * they can be correctly rescheduled later. Tracks dirty and maybe_dirty
	 * effects so they can be rescheduled if the branch survives.
	 * @param {Effect} effect
	 * @param {{ d: Effect[], m: Effect[] }} tracked
	 */
	function reset_branch(effect, tracked) {
		// clean branch = nothing dirty inside, no need to traverse further
		if ((effect.f & BRANCH_EFFECT) !== 0 && (effect.f & CLEAN) !== 0) {
			return;
		}

		if ((effect.f & DIRTY) !== 0) {
			tracked.d.push(effect);
		} else if ((effect.f & MAYBE_DIRTY) !== 0) {
			tracked.m.push(effect);
		}

		set_signal_status(effect, CLEAN);

		var e = effect.first;
		while (e !== null) {
			reset_branch(e, tracked);
			e = e.next;
		}
	}

	/**
	 * Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
	 * It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
	 *
	 * If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
	 * the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
	 *
	 * If `start` returns a cleanup function, it will be called when the effect is destroyed.
	 *
	 * If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
	 * are active, and the returned teardown function will only be called when all effects are destroyed.
	 *
	 * It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
	 *
	 * ```js
	 * import { createSubscriber } from 'svelte/reactivity';
	 * import { on } from 'svelte/events';
	 *
	 * export class MediaQuery {
	 * 	#query;
	 * 	#subscribe;
	 *
	 * 	constructor(query) {
	 * 		this.#query = window.matchMedia(`(${query})`);
	 *
	 * 		this.#subscribe = createSubscriber((update) => {
	 * 			// when the `change` event occurs, re-run any effects that read `this.current`
	 * 			const off = on(this.#query, 'change', update);
	 *
	 * 			// stop listening when all the effects are destroyed
	 * 			return () => off();
	 * 		});
	 * 	}
	 *
	 * 	get current() {
	 * 		// This makes the getter reactive, if read in an effect
	 * 		this.#subscribe();
	 *
	 * 		// Return the current state of the query, whether or not we're in an effect
	 * 		return this.#query.matches;
	 * 	}
	 * }
	 * ```
	 * @param {(update: () => void) => (() => void) | void} start
	 * @since 5.7.0
	 */
	function createSubscriber(start) {
		let subscribers = 0;
		let version = source(0);
		/** @type {(() => void) | void} */
		let stop;

		return () => {
			if (effect_tracking()) {
				get(version);

				render_effect(() => {
					if (subscribers === 0) {
						stop = untrack(() => start(() => increment(version)));
					}

					subscribers += 1;

					return () => {
						queue_micro_task(() => {
							// Only count down after a microtask, else we would reach 0 before our own render effect reruns,
							// but reach 1 again when the tick callback of the prior teardown runs. That would mean we
							// re-subcribe unnecessarily and create a memory leak because the old subscription is never cleaned up.
							subscribers -= 1;

							if (subscribers === 0) {
								stop?.();
								stop = undefined;
								// Increment the version to ensure any dependent deriveds are marked dirty when the subscription is picked up again later.
								// If we didn't do this then the comparison of write versions would determine that the derived has a later version than
								// the subscriber, and it would not be re-run.
								increment(version);
							}
						});
					};
				});
			}
		};
	}

	/** @import { Effect, Source, TemplateNode, } from '#client' */

	/**
	 * @typedef {{
	 * 	 onerror?: (error: unknown, reset: () => void) => void;
	 *   failed?: (anchor: Node, error: () => unknown, reset: () => () => void) => void;
	 *   pending?: (anchor: Node) => void;
	 * }} BoundaryProps
	 */

	var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;

	/**
	 * @param {TemplateNode} node
	 * @param {BoundaryProps} props
	 * @param {((anchor: Node) => void)} children
	 * @param {((error: unknown) => unknown) | undefined} [transform_error]
	 * @returns {void}
	 */
	function boundary(node, props, children, transform_error) {
		new Boundary(node, props, children, transform_error);
	}

	class Boundary {
		/** @type {Boundary | null} */
		parent;

		is_pending = false;

		/**
		 * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
		 * Inherited from parent boundary, or defaults to identity.
		 * @type {(error: unknown) => unknown}
		 */
		transform_error;

		/** @type {TemplateNode} */
		#anchor;

		/** @type {TemplateNode | null} */
		#hydrate_open = hydrating ? hydrate_node : null;

		/** @type {BoundaryProps} */
		#props;

		/** @type {((anchor: Node) => void)} */
		#children;

		/** @type {Effect} */
		#effect;

		/** @type {Effect | null} */
		#main_effect = null;

		/** @type {Effect | null} */
		#pending_effect = null;

		/** @type {Effect | null} */
		#failed_effect = null;

		/** @type {DocumentFragment | null} */
		#offscreen_fragment = null;

		#local_pending_count = 0;
		#pending_count = 0;
		#pending_count_update_queued = false;

		/** @type {Set<Effect>} */
		#dirty_effects = new Set();

		/** @type {Set<Effect>} */
		#maybe_dirty_effects = new Set();

		/**
		 * A source containing the number of pending async deriveds/expressions.
		 * Only created if `$effect.pending()` is used inside the boundary,
		 * otherwise updating the source results in needless `Batch.ensure()`
		 * calls followed by no-op flushes
		 * @type {Source<number> | null}
		 */
		#effect_pending = null;

		#effect_pending_subscriber = createSubscriber(() => {
			this.#effect_pending = source(this.#local_pending_count);

			return () => {
				this.#effect_pending = null;
			};
		});

		/**
		 * @param {TemplateNode} node
		 * @param {BoundaryProps} props
		 * @param {((anchor: Node) => void)} children
		 * @param {((error: unknown) => unknown) | undefined} [transform_error]
		 */
		constructor(node, props, children, transform_error) {
			this.#anchor = node;
			this.#props = props;

			this.#children = (anchor) => {
				var effect = /** @type {Effect} */ (active_effect);

				effect.b = this;
				effect.f |= BOUNDARY_EFFECT;

				children(anchor);
			};

			this.parent = /** @type {Effect} */ (active_effect).b;

			// Inherit transform_error from parent boundary, or use the provided one, or default to identity
			this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);

			this.#effect = block(() => {
				if (hydrating) {
					const comment = /** @type {Comment} */ (this.#hydrate_open);
					hydrate_next();

					const server_rendered_pending = comment.data === HYDRATION_START_ELSE;
					const server_rendered_failed = comment.data.startsWith(HYDRATION_START_FAILED);

					if (server_rendered_failed) {
						// Server rendered the failed snippet - hydrate it.
						// The serialized error is embedded in the comment: <!--[?<json>-->
						const serialized_error = JSON.parse(comment.data.slice(HYDRATION_START_FAILED.length));
						this.#hydrate_failed_content(serialized_error);
					} else if (server_rendered_pending) {
						this.#hydrate_pending_content();
					} else {
						this.#hydrate_resolved_content();
					}
				} else {
					this.#render();
				}
			}, flags);

			if (hydrating) {
				this.#anchor = hydrate_node;
			}
		}

		#hydrate_resolved_content() {
			try {
				this.#main_effect = branch(() => this.#children(this.#anchor));
			} catch (error) {
				this.error(error);
			}
		}

		/**
		 * @param {unknown} error The deserialized error from the server's hydration comment
		 */
		#hydrate_failed_content(error) {
			const failed = this.#props.failed;
			if (!failed) return;

			this.#failed_effect = branch(() => {
				failed(
					this.#anchor,
					() => error,
					() => () => {}
				);
			});
		}

		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;

			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));

			queue_micro_task(() => {
				var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
				var anchor = create_text();

				fragment.append(anchor);

				this.#main_effect = this.#run(() => {
					Batch.ensure();
					return branch(() => this.#children(anchor));
				});

				if (this.#pending_count === 0) {
					this.#anchor.before(fragment);
					this.#offscreen_fragment = null;

					pause_effect(/** @type {Effect} */ (this.#pending_effect), () => {
						this.#pending_effect = null;
					});

					this.#resolve();
				}
			});
		}

		#render() {
			try {
				this.is_pending = this.has_pending_snippet();
				this.#pending_count = 0;
				this.#local_pending_count = 0;

				this.#main_effect = branch(() => {
					this.#children(this.#anchor);
				});

				if (this.#pending_count > 0) {
					var fragment = (this.#offscreen_fragment = document.createDocumentFragment());
					move_effect(this.#main_effect, fragment);

					const pending = /** @type {(anchor: Node) => void} */ (this.#props.pending);
					this.#pending_effect = branch(() => pending(this.#anchor));
				} else {
					this.#resolve();
				}
			} catch (error) {
				this.error(error);
			}
		}

		#resolve() {
			this.is_pending = false;

			// any effects that were previously deferred should be rescheduled —
			// after the next traversal (which will happen immediately, due to the
			// same update that brought us here) the effects will be flushed
			for (const e of this.#dirty_effects) {
				set_signal_status(e, DIRTY);
				schedule_effect(e);
			}

			for (const e of this.#maybe_dirty_effects) {
				set_signal_status(e, MAYBE_DIRTY);
				schedule_effect(e);
			}

			this.#dirty_effects.clear();
			this.#maybe_dirty_effects.clear();
		}

		/**
		 * Defer an effect inside a pending boundary until the boundary resolves
		 * @param {Effect} effect
		 */
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
		}

		/**
		 * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
		 * @returns {boolean}
		 */
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}

		has_pending_snippet() {
			return !!this.#props.pending;
		}

		/**
		 * @template T
		 * @param {() => T} fn
		 */
		#run(fn) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			var previous_ctx = component_context;

			set_active_effect(this.#effect);
			set_active_reaction(this.#effect);
			set_component_context(this.#effect.ctx);

			try {
				return fn();
			} catch (e) {
				handle_error(e);
				return null;
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
				set_component_context(previous_ctx);
			}
		}

		/**
		 * Updates the pending count associated with the currently visible pending snippet,
		 * if any, such that we can replace the snippet with content once work is done
		 * @param {1 | -1} d
		 */
		#update_pending_count(d) {
			if (!this.has_pending_snippet()) {
				if (this.parent) {
					this.parent.#update_pending_count(d);
				}

				// if there's no parent, we're in a scope with no pending snippet
				return;
			}

			this.#pending_count += d;

			if (this.#pending_count === 0) {
				this.#resolve();

				if (this.#pending_effect) {
					pause_effect(this.#pending_effect, () => {
						this.#pending_effect = null;
					});
				}

				if (this.#offscreen_fragment) {
					this.#anchor.before(this.#offscreen_fragment);
					this.#offscreen_fragment = null;
				}
			}
		}

		/**
		 * Update the source that powers `$effect.pending()` inside this boundary,
		 * and controls when the current `pending` snippet (if any) is removed.
		 * Do not call from inside the class
		 * @param {1 | -1} d
		 */
		update_pending_count(d) {
			this.#update_pending_count(d);

			this.#local_pending_count += d;

			if (!this.#effect_pending || this.#pending_count_update_queued) return;
			this.#pending_count_update_queued = true;

			queue_micro_task(() => {
				this.#pending_count_update_queued = false;
				if (this.#effect_pending) {
					internal_set(this.#effect_pending, this.#local_pending_count);
				}
			});
		}

		get_effect_pending() {
			this.#effect_pending_subscriber();
			return get(/** @type {Source<number>} */ (this.#effect_pending));
		}

		/** @param {unknown} error */
		error(error) {
			var onerror = this.#props.onerror;
			let failed = this.#props.failed;

			// If we have nothing to capture the error, or if we hit an error while
			// rendering the fallback, re-throw for another boundary to handle
			if (!onerror && !failed) {
				throw error;
			}

			if (this.#main_effect) {
				destroy_effect(this.#main_effect);
				this.#main_effect = null;
			}

			if (this.#pending_effect) {
				destroy_effect(this.#pending_effect);
				this.#pending_effect = null;
			}

			if (this.#failed_effect) {
				destroy_effect(this.#failed_effect);
				this.#failed_effect = null;
			}

			if (hydrating) {
				set_hydrate_node(/** @type {TemplateNode} */ (this.#hydrate_open));
				next();
				set_hydrate_node(skip_nodes());
			}

			var did_reset = false;
			var calling_on_error = false;

			const reset = () => {
				if (did_reset) {
					svelte_boundary_reset_noop();
					return;
				}

				did_reset = true;

				if (calling_on_error) {
					svelte_boundary_reset_onerror();
				}

				if (this.#failed_effect !== null) {
					pause_effect(this.#failed_effect, () => {
						this.#failed_effect = null;
					});
				}

				this.#run(() => {
					// If the failure happened while flushing effects, current_batch can be null
					Batch.ensure();

					this.#render();
				});
			};

			/** @param {unknown} transformed_error */
			const handle_error_result = (transformed_error) => {
				try {
					calling_on_error = true;
					onerror?.(transformed_error, reset);
					calling_on_error = false;
				} catch (error) {
					invoke_error_boundary(error, this.#effect && this.#effect.parent);
				}

				if (failed) {
					this.#failed_effect = this.#run(() => {
						Batch.ensure();

						try {
							return branch(() => {
								// errors in `failed` snippets cause the boundary to error again
								// TODO Svelte 6: revisit this decision, most likely better to go to parent boundary instead
								var effect = /** @type {Effect} */ (active_effect);

								effect.b = this;
								effect.f |= BOUNDARY_EFFECT;

								failed(
									this.#anchor,
									() => transformed_error,
									() => reset
								);
							});
						} catch (error) {
							invoke_error_boundary(error, /** @type {Effect} */ (this.#effect.parent));
							return null;
						}
					});
				}
			};

			queue_micro_task(() => {
				// Run the error through the API-level transformError transform (e.g. SvelteKit's handleError)
				/** @type {unknown} */
				var result;
				try {
					result = this.transform_error(error);
				} catch (e) {
					invoke_error_boundary(e, this.#effect && this.#effect.parent);
					return;
				}

				if (
					result !== null &&
					typeof result === 'object' &&
					typeof (/** @type {any} */ (result).then) === 'function'
				) {
					// transformError returned a Promise — wait for it
					/** @type {any} */ (result).then(
						handle_error_result,
						/** @param {unknown} e */
						(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
					);
				} else {
					// Synchronous result — handle immediately
					handle_error_result(result);
				}
			});
		}
	}

	/** @import { Blocker, Effect, Value } from '#client' */

	/**
	 * @param {Blocker[]} blockers
	 * @param {Array<() => any>} sync
	 * @param {Array<() => Promise<any>>} async
	 * @param {(values: Value[]) => any} fn
	 */
	function flatten(blockers, sync, async, fn) {
		const d = is_runes() ? derived : derived_safe_equal;

		// Filter out already-settled blockers - no need to wait for them
		var pending = blockers.filter((b) => !b.settled);

		if (async.length === 0 && pending.length === 0) {
			fn(sync.map(d));
			return;
		}
		var parent = /** @type {Effect} */ (active_effect);

		var restore = capture();
		var blocker_promise =
			pending.length === 1
				? pending[0].promise
				: pending.length > 1
					? Promise.all(pending.map((b) => b.promise))
					: null;

		/** @param {Value[]} values */
		function finish(values) {
			restore();

			try {
				fn(values);
			} catch (error) {
				if ((parent.f & DESTROYED) === 0) {
					invoke_error_boundary(error, parent);
				}
			}

			unset_context();
		}

		// Fast path: blockers but no async expressions
		if (async.length === 0) {
			/** @type {Promise<any>} */ (blocker_promise).then(() => finish(sync.map(d)));
			return;
		}

		// Full path: has async expressions
		function run() {
			restore();
			Promise.all(async.map((expression) => async_derived(expression)))
				.then((result) => finish([...sync.map(d), ...result]))
				.catch((error) => invoke_error_boundary(error, parent));
		}

		if (blocker_promise) {
			blocker_promise.then(run);
		} else {
			run();
		}
	}

	/**
	 * Captures the current effect context so that we can restore it after
	 * some asynchronous work has happened (so that e.g. `await a + b`
	 * causes `b` to be registered as a dependency).
	 */
	function capture() {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_component_context = component_context;
		var previous_batch = current_batch;

		return function restore(activate_batch = true) {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_component_context);
			if (activate_batch) previous_batch?.activate();
		};
	}

	function unset_context(deactivate_batch = true) {
		set_active_effect(null);
		set_active_reaction(null);
		set_component_context(null);
		if (deactivate_batch) current_batch?.deactivate();
	}

	function increment_pending() {
		var boundary = /** @type {Boundary} */ (/** @type {Effect} */ (active_effect).b);
		var batch = /** @type {Batch} */ (current_batch);
		var blocking = boundary.is_rendered();

		boundary.update_pending_count(1);
		batch.increment(blocking);

		return () => {
			boundary.update_pending_count(-1);
			batch.decrement(blocking);
		};
	}

	/** @import { Derived, Effect, Source } from '#client' */
	/** @import { Batch } from './batch.js'; */

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived(fn) {
		var flags = DERIVED | DIRTY;
		var parent_derived =
			active_reaction !== null && (active_reaction.f & DERIVED) !== 0
				? /** @type {Derived} */ (active_reaction)
				: null;

		if (active_effect !== null) {
			// Since deriveds are evaluated lazily, any effects created inside them are
			// created too late to ensure that the parent effect is added to the tree
			active_effect.f |= EFFECT_PRESERVED;
		}

		/** @type {Derived<V>} */
		const signal = {
			ctx: component_context,
			deps: null,
			effects: null,
			equals,
			f: flags,
			fn,
			reactions: null,
			rv: 0,
			v: /** @type {V} */ (UNINITIALIZED),
			wv: 0,
			parent: parent_derived ?? active_effect,
			ac: null
		};

		return signal;
	}

	/**
	 * @template V
	 * @param {() => V | Promise<V>} fn
	 * @param {string} [label]
	 * @param {string} [location] If provided, print a warning if the value is not read immediately after update
	 * @returns {Promise<Source<V>>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function async_derived(fn, label, location) {
		let parent = /** @type {Effect | null} */ (active_effect);

		if (parent === null) {
			async_derived_orphan();
		}

		var promise = /** @type {Promise<V>} */ (/** @type {unknown} */ (undefined));
		var signal = source(/** @type {V} */ (UNINITIALIZED));

		// only suspend in async deriveds created on initialisation
		var should_suspend = !active_reaction;

		/** @type {Map<Batch, ReturnType<typeof deferred<V>>>} */
		var deferreds = new Map();

		async_effect(() => {

			/** @type {ReturnType<typeof deferred<V>>} */
			var d = deferred();
			promise = d.promise;

			try {
				// If this code is changed at some point, make sure to still access the then property
				// of fn() to read any signals it might access, so that we track them as dependencies.
				// We call `unset_context` to undo any `save` calls that happen inside `fn()`
				Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
			} catch (error) {
				d.reject(error);
				unset_context();
			}

			var batch = /** @type {Batch} */ (current_batch);

			if (should_suspend) {
				var decrement_pending = increment_pending();

				deferreds.get(batch)?.reject(STALE_REACTION);
				deferreds.delete(batch); // delete to ensure correct order in Map iteration below
				deferreds.set(batch, d);
			}

			/**
			 * @param {any} value
			 * @param {unknown} error
			 */
			const handler = (value, error = undefined) => {

				batch.activate();

				if (error) {
					if (error !== STALE_REACTION) {
						signal.f |= ERROR_VALUE;

						// @ts-expect-error the error is the wrong type, but we don't care
						internal_set(signal, error);
					}
				} else {
					if ((signal.f & ERROR_VALUE) !== 0) {
						signal.f ^= ERROR_VALUE;
					}

					internal_set(signal, value);

					// All prior async derived runs are now stale
					for (const [b, d] of deferreds) {
						deferreds.delete(b);
						if (b === batch) break;
						d.reject(STALE_REACTION);
					}
				}

				if (decrement_pending) {
					decrement_pending();
				}
			};

			d.promise.then(handler, (e) => handler(null, e || 'unknown'));
		});

		teardown(() => {
			for (const d of deferreds.values()) {
				d.reject(STALE_REACTION);
			}
		});

		return new Promise((fulfil) => {
			/** @param {Promise<V>} p */
			function next(p) {
				function go() {
					if (p === promise) {
						fulfil(signal);
					} else {
						// if the effect re-runs before the initial promise
						// resolves, delay resolution until we have a value
						next(promise);
					}
				}

				p.then(go, go);
			}

			next(promise);
		});
	}

	/**
	 * @template V
	 * @param {() => V} fn
	 * @returns {Derived<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function derived_safe_equal(fn) {
		const signal = derived(fn);
		signal.equals = safe_equals;
		return signal;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function destroy_derived_effects(derived) {
		var effects = derived.effects;

		if (effects !== null) {
			derived.effects = null;

			for (var i = 0; i < effects.length; i += 1) {
				destroy_effect(/** @type {Effect} */ (effects[i]));
			}
		}
	}

	/**
	 * @param {Derived} derived
	 * @returns {Effect | null}
	 */
	function get_derived_parent_effect(derived) {
		var parent = derived.parent;
		while (parent !== null) {
			if ((parent.f & DERIVED) === 0) {
				// The original parent effect might've been destroyed but the derived
				// is used elsewhere now - do not return the destroyed effect in that case
				return (parent.f & DESTROYED) === 0 ? /** @type {Effect} */ (parent) : null;
			}
			parent = parent.parent;
		}
		return null;
	}

	/**
	 * @template T
	 * @param {Derived} derived
	 * @returns {T}
	 */
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;

		set_active_effect(get_derived_parent_effect(derived));

		{
			try {
				derived.f &= ~WAS_MARKED;
				destroy_derived_effects(derived);
				value = update_reaction(derived);
			} finally {
				set_active_effect(prev_active_effect);
			}
		}

		return value;
	}

	/**
	 * @param {Derived} derived
	 * @returns {void}
	 */
	function update_derived(derived) {
		var value = execute_derived(derived);

		if (!derived.equals(value)) {
			derived.wv = increment_write_version();

			// in a fork, we don't update the underlying value, just `batch_values`.
			// the underlying value will be updated when the fork is committed.
			// otherwise, the next time we get here after a 'real world' state
			// change, `derived.equals` may incorrectly return `true`
			if (!current_batch?.is_fork || derived.deps === null) {
				derived.v = value;

				// deriveds without dependencies should never be recomputed
				if (derived.deps === null) {
					set_signal_status(derived, CLEAN);
					return;
				}
			}
		}

		// don't mark derived clean if we're reading it inside a
		// cleanup function, or it will cache a stale value
		if (is_destroying_effect) {
			return;
		}

		// During time traveling we don't want to reset the status so that
		// traversal of the graph in the other batches still happens
		if (batch_values !== null) {
			// only cache the value if we're in a tracking context, otherwise we won't
			// clear the cache in `mark_reactions` when dependencies are updated
			if (effect_tracking() || current_batch?.is_fork) {
				batch_values.set(derived, value);
			}
		} else {
			update_derived_status(derived);
		}
	}

	/**
	 * @param {Derived} derived
	 */
	function freeze_derived_effects(derived) {
		if (derived.effects === null) return;

		for (const e of derived.effects) {
			// if the effect has a teardown function or abort signal, call it
			if (e.teardown || e.ac) {
				e.teardown?.();
				e.ac?.abort(STALE_REACTION);

				// make it a noop so it doesn't get called again if the derived
				// is unfrozen. we don't set it to `null`, because the existence
				// of a teardown function is what determines whether the
				// effect runs again during unfreezing
				e.teardown = noop;
				e.ac = null;

				remove_reactions(e, 0);
				destroy_effect_children(e);
			}
		}
	}

	/**
	 * @param {Derived} derived
	 */
	function unfreeze_derived_effects(derived) {
		if (derived.effects === null) return;

		for (const e of derived.effects) {
			// if the effect was previously frozen — indicated by the presence
			// of a teardown function — unfreeze it
			if (e.teardown) {
				update_effect(e);
			}
		}
	}

	/** @import { Derived, Effect, Source, Value } from '#client' */

	/** @type {Set<any>} */
	let eager_effects = new Set();

	/** @type {Map<Source, any>} */
	const old_values = new Map();

	let eager_effects_deferred = false;

	/**
	 * @template V
	 * @param {V} v
	 * @param {Error | null} [stack]
	 * @returns {Source<V>}
	 */
	// TODO rename this to `state` throughout the codebase
	function source(v, stack) {
		/** @type {Value} */
		var signal = {
			f: 0, // TODO ideally we could skip this altogether, but it causes type errors
			v,
			reactions: null,
			equals,
			rv: 0,
			wv: 0
		};

		return signal;
	}

	/**
	 * @template V
	 * @param {V} v
	 * @param {Error | null} [stack]
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function state(v, stack) {
		const s = source(v);

		push_reaction_value(s);

		return s;
	}

	/**
	 * @template V
	 * @param {V} initial_value
	 * @param {boolean} [immutable]
	 * @returns {Source<V>}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function mutable_source(initial_value, immutable = false, trackable = true) {
		const s = source(initial_value);
		if (!immutable) {
			s.equals = safe_equals;
		}

		// bind the signal to the component context, in case we need to
		// track updates to trigger beforeUpdate/afterUpdate callbacks
		if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
			(component_context.l.s ??= []).push(s);
		}

		return s;
	}

	/**
	 * @template V
	 * @param {Value<V>} source
	 * @param {V} value
	 */
	function mutate(source, value) {
		set(
			source,
			untrack(() => get(source))
		);
		return value;
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @param {boolean} [should_proxy]
	 * @returns {V}
	 */
	function set(source, value, should_proxy = false) {
		if (
			active_reaction !== null &&
			// since we are untracking the function inside `$inspect.with` we need to add this check
			// to ensure we error if state is set inside an inspect effect
			(!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) &&
			is_runes() &&
			(active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 &&
			(current_sources === null || !includes.call(current_sources, source))
		) {
			state_unsafe_mutation();
		}

		let new_value = should_proxy ? proxy(value) : value;

		return internal_set(source, new_value);
	}

	/**
	 * @template V
	 * @param {Source<V>} source
	 * @param {V} value
	 * @returns {V}
	 */
	function internal_set(source, value) {
		if (!source.equals(value)) {
			var old_value = source.v;

			if (is_destroying_effect) {
				old_values.set(source, value);
			} else {
				old_values.set(source, old_value);
			}

			source.v = value;

			var batch = Batch.ensure();
			batch.capture(source, old_value);

			if ((source.f & DERIVED) !== 0) {
				const derived = /** @type {Derived} */ (source);

				// if we are assigning to a dirty derived we set it to clean/maybe dirty but we also eagerly execute it to track the dependencies
				if ((source.f & DIRTY) !== 0) {
					execute_derived(derived);
				}

				update_derived_status(derived);
			}

			source.wv = increment_write_version();

			// For debugging, in case you want to know which reactions are being scheduled:
			// log_reactions(source);
			mark_reactions(source, DIRTY);

			// It's possible that the current reaction might not have up-to-date dependencies
			// whilst it's actively running. So in the case of ensuring it registers the reaction
			// properly for itself, we need to ensure the current effect actually gets
			// scheduled. i.e: `$effect(() => x++)`
			if (
				is_runes() &&
				active_effect !== null &&
				(active_effect.f & CLEAN) !== 0 &&
				(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0
			) {
				if (untracked_writes === null) {
					set_untracked_writes([source]);
				} else {
					untracked_writes.push(source);
				}
			}

			if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
				flush_eager_effects();
			}
		}

		return value;
	}

	function flush_eager_effects() {
		eager_effects_deferred = false;

		for (const effect of eager_effects) {
			// Mark clean inspect-effects as maybe dirty and then check their dirtiness
			// instead of just updating the effects - this way we avoid overfiring.
			if ((effect.f & CLEAN) !== 0) {
				set_signal_status(effect, MAYBE_DIRTY);
			}

			if (is_dirty(effect)) {
				update_effect(effect);
			}
		}

		eager_effects.clear();
	}

	/**
	 * Silently (without using `get`) increment a source
	 * @param {Source<number>} source
	 */
	function increment(source) {
		set(source, source.v + 1);
	}

	/**
	 * @param {Value} signal
	 * @param {number} status should be DIRTY or MAYBE_DIRTY
	 * @returns {void}
	 */
	function mark_reactions(signal, status) {
		var reactions = signal.reactions;
		if (reactions === null) return;

		var runes = is_runes();
		var length = reactions.length;

		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;

			// In legacy mode, skip the current effect to prevent infinite loops
			if (!runes && reaction === active_effect) continue;

			var not_dirty = (flags & DIRTY) === 0;

			// don't set a DIRTY reaction to MAYBE_DIRTY
			if (not_dirty) {
				set_signal_status(reaction, status);
			}

			if ((flags & DERIVED) !== 0) {
				var derived = /** @type {Derived} */ (reaction);

				batch_values?.delete(derived);

				if ((flags & WAS_MARKED) === 0) {
					// Only connected deriveds can be reliably unmarked right away
					if (flags & CONNECTED) {
						reaction.f |= WAS_MARKED;
					}

					mark_reactions(derived, MAYBE_DIRTY);
				}
			} else if (not_dirty) {
				if ((flags & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
					eager_block_effects.add(/** @type {Effect} */ (reaction));
				}

				schedule_effect(/** @type {Effect} */ (reaction));
			}
		}
	}

	/** @import { Source } from '#client' */

	/**
	 * @template T
	 * @param {T} value
	 * @returns {T}
	 */
	function proxy(value) {
		// if non-proxyable, or is already a proxy, return `value`
		if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
			return value;
		}

		const prototype = get_prototype_of(value);

		if (prototype !== object_prototype && prototype !== array_prototype) {
			return value;
		}

		/** @type {Map<any, Source<any>>} */
		var sources = new Map();
		var is_proxied_array = is_array(value);
		var version = state(0);
		var parent_version = update_version;

		/**
		 * Executes the proxy in the context of the reaction it was originally created in, if any
		 * @template T
		 * @param {() => T} fn
		 */
		var with_parent = (fn) => {
			if (update_version === parent_version) {
				return fn();
			}

			// child source is being created after the initial proxy —
			// prevent it from being associated with the current reaction
			var reaction = active_reaction;
			var version = update_version;

			set_active_reaction(null);
			set_update_version(parent_version);

			var result = fn();

			set_active_reaction(reaction);
			set_update_version(version);

			return result;
		};

		if (is_proxied_array) {
			// We need to create the length source eagerly to ensure that
			// mutations to the array are properly synced with our proxy
			sources.set('length', state(/** @type {any[]} */ (value).length));
		}

		return new Proxy(/** @type {any} */ (value), {
			defineProperty(_, prop, descriptor) {
				if (
					!('value' in descriptor) ||
					descriptor.configurable === false ||
					descriptor.enumerable === false ||
					descriptor.writable === false
				) {
					// we disallow non-basic descriptors, because unless they are applied to the
					// target object — which we avoid, so that state can be forked — we will run
					// afoul of the various invariants
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor#invariants
					state_descriptors_fixed();
				}
				var s = sources.get(prop);
				if (s === undefined) {
					with_parent(() => {
						var s = state(descriptor.value);
						sources.set(prop, s);
						return s;
					});
				} else {
					set(s, descriptor.value, true);
				}

				return true;
			},

			deleteProperty(target, prop) {
				var s = sources.get(prop);

				if (s === undefined) {
					if (prop in target) {
						const s = with_parent(() => state(UNINITIALIZED));
						sources.set(prop, s);
						increment(version);
					}
				} else {
					set(s, UNINITIALIZED);
					increment(version);
				}

				return true;
			},

			get(target, prop, receiver) {
				if (prop === STATE_SYMBOL) {
					return value;
				}

				var s = sources.get(prop);
				var exists = prop in target;

				// create a source, but only if it's an own property and not a prototype property
				if (s === undefined && (!exists || get_descriptor(target, prop)?.writable)) {
					s = with_parent(() => {
						var p = proxy(exists ? target[prop] : UNINITIALIZED);
						var s = state(p);

						return s;
					});

					sources.set(prop, s);
				}

				if (s !== undefined) {
					var v = get(s);
					return v === UNINITIALIZED ? undefined : v;
				}

				return Reflect.get(target, prop, receiver);
			},

			getOwnPropertyDescriptor(target, prop) {
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				if (descriptor && 'value' in descriptor) {
					var s = sources.get(prop);
					if (s) descriptor.value = get(s);
				} else if (descriptor === undefined) {
					var source = sources.get(prop);
					var value = source?.v;

					if (source !== undefined && value !== UNINITIALIZED) {
						return {
							enumerable: true,
							configurable: true,
							value,
							writable: true
						};
					}
				}

				return descriptor;
			},

			has(target, prop) {
				if (prop === STATE_SYMBOL) {
					return true;
				}

				var s = sources.get(prop);
				var has = (s !== undefined && s.v !== UNINITIALIZED) || Reflect.has(target, prop);

				if (
					s !== undefined ||
					(active_effect !== null && (!has || get_descriptor(target, prop)?.writable))
				) {
					if (s === undefined) {
						s = with_parent(() => {
							var p = has ? proxy(target[prop]) : UNINITIALIZED;
							var s = state(p);

							return s;
						});

						sources.set(prop, s);
					}

					var value = get(s);
					if (value === UNINITIALIZED) {
						return false;
					}
				}

				return has;
			},

			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;

				// variable.length = value -> clear all signals with index >= value
				if (is_proxied_array && prop === 'length') {
					for (var i = value; i < /** @type {Source<number>} */ (s).v; i += 1) {
						var other_s = sources.get(i + '');
						if (other_s !== undefined) {
							set(other_s, UNINITIALIZED);
						} else if (i in target) {
							// If the item exists in the original, we need to create an uninitialized source,
							// else a later read of the property would result in a source being created with
							// the value of the original item at that index.
							other_s = with_parent(() => state(UNINITIALIZED));
							sources.set(i + '', other_s);
						}
					}
				}

				// If we haven't yet created a source for this property, we need to ensure
				// we do so otherwise if we read it later, then the write won't be tracked and
				// the heuristics of effects will be different vs if we had read the proxied
				// object property before writing to that property.
				if (s === undefined) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = with_parent(() => state(undefined));
						set(s, proxy(value));

						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;

					var p = with_parent(() => proxy(value));
					set(s, p);
				}

				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

				// Set the new value before updating any signals so that any listeners get the new value
				if (descriptor?.set) {
					descriptor.set.call(receiver, value);
				}

				if (!has) {
					// If we have mutated an array directly, we might need to
					// signal that length has also changed. Do it before updating metadata
					// to ensure that iterating over the array as a result of a metadata update
					// will not cause the length to be out of sync.
					if (is_proxied_array && typeof prop === 'string') {
						var ls = /** @type {Source<number>} */ (sources.get('length'));
						var n = Number(prop);

						if (Number.isInteger(n) && n >= ls.v) {
							set(ls, n + 1);
						}
					}

					increment(version);
				}

				return true;
			},

			ownKeys(target) {
				get(version);

				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === undefined || source.v !== UNINITIALIZED;
				});

				for (var [key, source] of sources) {
					if (source.v !== UNINITIALIZED && !(key in target)) {
						own_keys.push(key);
					}
				}

				return own_keys;
			},

			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}

	/** @import { Effect, TemplateNode } from '#client' */

	// export these for reference in the compiled code, making global name deduplication unnecessary
	/** @type {Window} */
	var $window;

	/** @type {boolean} */
	var is_firefox;

	/** @type {() => Node | null} */
	var first_child_getter;
	/** @type {() => Node | null} */
	var next_sibling_getter;

	/**
	 * Initialize these lazily to avoid issues when using the runtime in a server context
	 * where these globals are not available while avoiding a separate server entry point
	 */
	function init_operations() {
		if ($window !== undefined) {
			return;
		}

		$window = window;
		is_firefox = /Firefox/.test(navigator.userAgent);

		var element_prototype = Element.prototype;
		var node_prototype = Node.prototype;
		var text_prototype = Text.prototype;

		// @ts-ignore
		first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
		// @ts-ignore
		next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;

		if (is_extensible(element_prototype)) {
			// the following assignments improve perf of lookups on DOM nodes
			// @ts-expect-error
			element_prototype.__click = undefined;
			// @ts-expect-error
			element_prototype.__className = undefined;
			// @ts-expect-error
			element_prototype.__attributes = null;
			// @ts-expect-error
			element_prototype.__style = undefined;
			// @ts-expect-error
			element_prototype.__e = undefined;
		}

		if (is_extensible(text_prototype)) {
			// @ts-expect-error
			text_prototype.__t = undefined;
		}
	}

	/**
	 * @param {string} value
	 * @returns {Text}
	 */
	function create_text(value = '') {
		return document.createTextNode(value);
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return /** @type {TemplateNode | null} */ (first_child_getter.call(node));
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 */
	/*@__NO_SIDE_EFFECTS__*/
	function get_next_sibling(node) {
		return /** @type {TemplateNode | null} */ (next_sibling_getter.call(node));
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @template {Node} N
	 * @param {N} node
	 * @param {boolean} is_text
	 * @returns {TemplateNode | null}
	 */
	function child(node, is_text) {
		if (!hydrating) {
			return get_first_child(node);
		}

		var child = get_first_child(hydrate_node);

		// Child can be null if we have an element with a single child, like `<p>{text}</p>`, where `text` is empty
		if (child === null) {
			child = hydrate_node.appendChild(create_text());
		} else if (is_text && child.nodeType !== TEXT_NODE) {
			var text = create_text();
			child?.before(text);
			set_hydrate_node(text);
			return text;
		}

		if (is_text) {
			merge_text_nodes(/** @type {Text} */ (child));
		}

		set_hydrate_node(child);
		return child;
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {TemplateNode} node
	 * @param {boolean} [is_text]
	 * @returns {TemplateNode | null}
	 */
	function first_child(node, is_text = false) {
		if (!hydrating) {
			var first = get_first_child(node);

			// TODO prevent user comments with the empty string when preserveComments is true
			if (first instanceof Comment && first.data === '') return get_next_sibling(first);

			return first;
		}

		if (is_text) {
			// if an {expression} is empty during SSR, there might be no
			// text node to hydrate — we must therefore create one
			if (hydrate_node?.nodeType !== TEXT_NODE) {
				var text = create_text();

				hydrate_node?.before(text);
				set_hydrate_node(text);
				return text;
			}

			merge_text_nodes(/** @type {Text} */ (hydrate_node));
		}

		return hydrate_node;
	}

	/**
	 * Don't mark this as side-effect-free, hydration needs to walk all nodes
	 * @param {TemplateNode} node
	 * @param {number} count
	 * @param {boolean} is_text
	 * @returns {TemplateNode | null}
	 */
	function sibling(node, count = 1, is_text = false) {
		let next_sibling = hydrating ? hydrate_node : node;
		var last_sibling;

		while (count--) {
			last_sibling = next_sibling;
			next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
		}

		if (!hydrating) {
			return next_sibling;
		}

		if (is_text) {
			// if a sibling {expression} is empty during SSR, there might be no
			// text node to hydrate — we must therefore create one
			if (next_sibling?.nodeType !== TEXT_NODE) {
				var text = create_text();
				// If the next sibling is `null` and we're handling text then it's because
				// the SSR content was empty for the text, so we need to generate a new text
				// node and insert it after the last sibling
				if (next_sibling === null) {
					last_sibling?.after(text);
				} else {
					next_sibling.before(text);
				}
				set_hydrate_node(text);
				return text;
			}

			merge_text_nodes(/** @type {Text} */ (next_sibling));
		}

		set_hydrate_node(next_sibling);
		return next_sibling;
	}

	/**
	 * @template {Node} N
	 * @param {N} node
	 * @returns {void}
	 */
	function clear_text_content(node) {
		node.textContent = '';
	}

	/**
	 * Returns `true` if we're updating the current block, for example `condition` in
	 * an `{#if condition}` block just changed. In this case, the branch should be
	 * appended (or removed) at the same time as other updates within the
	 * current `<svelte:boundary>`
	 */
	function should_defer_append() {
		return false;
	}

	/**
	 * @template {keyof HTMLElementTagNameMap | string} T
	 * @param {T} tag
	 * @param {string} [namespace]
	 * @param {string} [is]
	 * @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
	 */
	function create_element(tag, namespace, is) {
		let options = undefined;
		return /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */ (
			document.createElementNS(NAMESPACE_HTML, tag, options)
		);
	}

	/**
	 * Browsers split text nodes larger than 65536 bytes when parsing.
	 * For hydration to succeed, we need to stitch them back together
	 * @param {Text} text
	 */
	function merge_text_nodes(text) {
		if (/** @type {string} */ (text.nodeValue).length < 65536) {
			return;
		}

		let next = text.nextSibling;

		while (next !== null && next.nodeType === TEXT_NODE) {
			next.remove();

			/** @type {string} */ (text.nodeValue) += /** @type {string} */ (next.nodeValue);

			next = text.nextSibling;
		}
	}

	let listening_to_form_reset = false;

	function add_form_reset_listener() {
		if (!listening_to_form_reset) {
			listening_to_form_reset = true;
			document.addEventListener(
				'reset',
				(evt) => {
					// Needs to happen one tick later or else the dom properties of the form
					// elements have not updated to their reset values yet
					Promise.resolve().then(() => {
						if (!evt.defaultPrevented) {
							for (const e of /**@type {HTMLFormElement} */ (evt.target).elements) {
								// @ts-expect-error
								e.__on_r?.();
							}
						}
					});
				},
				// In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
				{ capture: true }
			);
		}
	}

	/**
	 * @template T
	 * @param {() => T} fn
	 */
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	/**
	 * Listen to the given event, and then instantiate a global form reset listener if not already done,
	 * to notify all bindings when the form is reset
	 * @param {HTMLElement} element
	 * @param {string} event
	 * @param {(is_reset?: true) => void} handler
	 * @param {(is_reset?: true) => void} [on_reset]
	 */
	function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
		element.addEventListener(event, () => without_reactive_context(handler));
		// @ts-expect-error
		const prev = element.__on_r;
		if (prev) {
			// special case for checkbox that can have multiple binds (group & checked)
			// @ts-expect-error
			element.__on_r = () => {
				prev();
				on_reset(true);
			};
		} else {
			// @ts-expect-error
			element.__on_r = () => on_reset(true);
		}

		add_form_reset_listener();
	}

	/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */

	/**
	 * @param {'$effect' | '$effect.pre' | '$inspect'} rune
	 */
	function validate_effect(rune) {
		if (active_effect === null) {
			if (active_reaction === null) {
				effect_orphan();
			}

			effect_in_unowned_derived();
		}

		if (is_destroying_effect) {
			effect_in_teardown();
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {Effect} parent_effect
	 */
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) {
			parent_effect.last = parent_effect.first = effect;
		} else {
			parent_last.next = effect;
			effect.prev = parent_last;
			parent_effect.last = effect;
		}
	}

	/**
	 * @param {number} type
	 * @param {null | (() => void | (() => void))} fn
	 * @param {boolean} sync
	 * @returns {Effect}
	 */
	function create_effect(type, fn, sync) {
		var parent = active_effect;

		if (parent !== null && (parent.f & INERT) !== 0) {
			type |= INERT;
		}

		/** @type {Effect} */
		var effect = {
			ctx: component_context,
			deps: null,
			nodes: null,
			f: type | DIRTY | CONNECTED,
			first: null,
			fn,
			last: null,
			next: null,
			parent,
			b: parent && parent.b,
			prev: null,
			teardown: null,
			wv: 0,
			ac: null
		};

		if (sync) {
			try {
				update_effect(effect);
			} catch (e) {
				destroy_effect(effect);
				throw e;
			}
		} else if (fn !== null) {
			schedule_effect(effect);
		}

		/** @type {Effect | null} */
		var e = effect;

		// if an effect has already ran and doesn't need to be kept in the tree
		// (because it won't re-run, has no DOM, and has no teardown etc)
		// then we skip it and go to its child (if any)
		if (
			sync &&
			e.deps === null &&
			e.teardown === null &&
			e.nodes === null &&
			e.first === e.last && // either `null`, or a singular child
			(e.f & EFFECT_PRESERVED) === 0
		) {
			e = e.first;
			if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
				e.f |= EFFECT_TRANSPARENT;
			}
		}

		if (e !== null) {
			e.parent = parent;

			if (parent !== null) {
				push_effect(e, parent);
			}

			// if we're in a derived, add the effect there too
			if (
				active_reaction !== null &&
				(active_reaction.f & DERIVED) !== 0 &&
				(type & ROOT_EFFECT) === 0
			) {
				var derived = /** @type {Derived} */ (active_reaction);
				(derived.effects ??= []).push(e);
			}
		}

		return effect;
	}

	/**
	 * Internal representation of `$effect.tracking()`
	 * @returns {boolean}
	 */
	function effect_tracking() {
		return active_reaction !== null && !untracking;
	}

	/**
	 * @param {() => void} fn
	 */
	function teardown(fn) {
		const effect = create_effect(RENDER_EFFECT, null, false);
		set_signal_status(effect, CLEAN);
		effect.teardown = fn;
		return effect;
	}

	/**
	 * Internal representation of `$effect(...)`
	 * @param {() => void | (() => void)} fn
	 */
	function user_effect(fn) {
		validate_effect();

		// Non-nested `$effect(...)` in a component should be deferred
		// until the component is mounted
		var flags = /** @type {Effect} */ (active_effect).f;
		var defer = !active_reaction && (flags & BRANCH_EFFECT) !== 0 && (flags & REACTION_RAN) === 0;

		if (defer) {
			// Top-level `$effect(...)` in an unmounted component — defer until mount
			var context = /** @type {ComponentContext} */ (component_context);
			(context.e ??= []).push(fn);
		} else {
			// Everything else — create immediately
			return create_user_effect(fn);
		}
	}

	/**
	 * @param {() => void | (() => void)} fn
	 */
	function create_user_effect(fn) {
		return create_effect(EFFECT | USER_EFFECT, fn, false);
	}

	/**
	 * Internal representation of `$effect.pre(...)`
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function user_pre_effect(fn) {
		validate_effect();
		return create_effect(RENDER_EFFECT | USER_EFFECT, fn, true);
	}

	/**
	 * Internal representation of `$effect.root(...)`
	 * @param {() => void | (() => void)} fn
	 * @returns {() => void}
	 */
	function effect_root(fn) {
		Batch.ensure();
		const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);

		return () => {
			destroy_effect(effect);
		};
	}

	/**
	 * An effect root whose children can transition out
	 * @param {() => void} fn
	 * @returns {(options?: { outro?: boolean }) => Promise<void>}
	 */
	function component_root(fn) {
		Batch.ensure();
		const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);

		return (options = {}) => {
			return new Promise((fulfil) => {
				if (options.outro) {
					pause_effect(effect, () => {
						destroy_effect(effect);
						fulfil(undefined);
					});
				} else {
					destroy_effect(effect);
					fulfil(undefined);
				}
			});
		};
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function effect(fn) {
		return create_effect(EFFECT, fn, false);
	}

	/**
	 * Internal representation of `$: ..`
	 * @param {() => any} deps
	 * @param {() => void | (() => void)} fn
	 */
	function legacy_pre_effect(deps, fn) {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		/** @type {{ effect: null | Effect, ran: boolean, deps: () => any }} */
		var token = { effect: null, ran: false, deps };

		context.l.$.push(token);

		token.effect = render_effect(() => {
			deps();

			// If this legacy pre effect has already run before the end of the reset, then
			// bail out to emulate the same behavior.
			if (token.ran) return;

			token.ran = true;
			untrack(fn);
		});
	}

	function legacy_pre_effect_reset() {
		var context = /** @type {ComponentContextLegacy} */ (component_context);

		render_effect(() => {
			// Run dirty `$:` statements
			for (var token of context.l.$) {
				token.deps();

				var effect = token.effect;

				// If the effect is CLEAN, then make it MAYBE_DIRTY. This ensures we traverse through
				// the effects dependencies and correctly ensure each dependency is up-to-date.
				if ((effect.f & CLEAN) !== 0 && effect.deps !== null) {
					set_signal_status(effect, MAYBE_DIRTY);
				}

				if (is_dirty(effect)) {
					update_effect(effect);
				}

				token.ran = false;
			}
		});
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function async_effect(fn) {
		return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
	}

	/**
	 * @param {() => void | (() => void)} fn
	 * @returns {Effect}
	 */
	function render_effect(fn, flags = 0) {
		return create_effect(RENDER_EFFECT | flags, fn, true);
	}

	/**
	 * @param {(...expressions: any) => void | (() => void)} fn
	 * @param {Array<() => any>} sync
	 * @param {Array<() => Promise<any>>} async
	 * @param {Blocker[]} blockers
	 */
	function template_effect(fn, sync = [], async = [], blockers = []) {
		flatten(blockers, sync, async, (values) => {
			create_effect(RENDER_EFFECT, () => fn(...values.map(get)), true);
		});
	}

	/**
	 * @param {(() => void)} fn
	 * @param {number} flags
	 */
	function block(fn, flags = 0) {
		var effect = create_effect(BLOCK_EFFECT | flags, fn, true);
		return effect;
	}

	/**
	 * @param {(() => void)} fn
	 */
	function branch(fn) {
		return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn, true);
	}

	/**
	 * @param {Effect} effect
	 */
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
			}
		}
	}

	/**
	 * @param {Effect} signal
	 * @param {boolean} remove_dom
	 * @returns {void}
	 */
	function destroy_effect_children(signal, remove_dom = false) {
		var effect = signal.first;
		signal.first = signal.last = null;

		while (effect !== null) {
			const controller = effect.ac;

			if (controller !== null) {
				without_reactive_context(() => {
					controller.abort(STALE_REACTION);
				});
			}

			var next = effect.next;

			if ((effect.f & ROOT_EFFECT) !== 0) {
				// this is now an independent root
				effect.parent = null;
			} else {
				destroy_effect(effect, remove_dom);
			}

			effect = next;
		}
	}

	/**
	 * @param {Effect} signal
	 * @returns {void}
	 */
	function destroy_block_effect_children(signal) {
		var effect = signal.first;

		while (effect !== null) {
			var next = effect.next;
			if ((effect.f & BRANCH_EFFECT) === 0) {
				destroy_effect(effect);
			}
			effect = next;
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} [remove_dom]
	 * @returns {void}
	 */
	function destroy_effect(effect, remove_dom = true) {
		var removed = false;

		if (
			(remove_dom || (effect.f & HEAD_EFFECT) !== 0) &&
			effect.nodes !== null &&
			effect.nodes.end !== null
		) {
			remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
			removed = true;
		}

		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect, 0);
		set_signal_status(effect, DESTROYED);

		var transitions = effect.nodes && effect.nodes.t;

		if (transitions !== null) {
			for (const transition of transitions) {
				transition.stop();
			}
		}

		execute_effect_teardown(effect);

		var parent = effect.parent;

		// If the parent doesn't have any children, then skip this work altogether
		if (parent !== null && parent.first !== null) {
			unlink_effect(effect);
		}

		// `first` and `child` are nulled out in destroy_effect_children
		// we don't null out `parent` so that error propagation can work correctly
		effect.next =
			effect.prev =
			effect.teardown =
			effect.ctx =
			effect.deps =
			effect.fn =
			effect.nodes =
			effect.ac =
				null;
	}

	/**
	 *
	 * @param {TemplateNode | null} node
	 * @param {TemplateNode} end
	 */
	function remove_effect_dom(node, end) {
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : get_next_sibling(node);

			node.remove();
			node = next;
		}
	}

	/**
	 * Detach an effect from the effect tree, freeing up memory and
	 * reducing the amount of work that happens on subsequent traversals
	 * @param {Effect} effect
	 */
	function unlink_effect(effect) {
		var parent = effect.parent;
		var prev = effect.prev;
		var next = effect.next;

		if (prev !== null) prev.next = next;
		if (next !== null) next.prev = prev;

		if (parent !== null) {
			if (parent.first === effect) parent.first = next;
			if (parent.last === effect) parent.last = prev;
		}
	}

	/**
	 * When a block effect is removed, we don't immediately destroy it or yank it
	 * out of the DOM, because it might have transitions. Instead, we 'pause' it.
	 * It stays around (in memory, and in the DOM) until outro transitions have
	 * completed, and if the state change is reversed then we _resume_ it.
	 * A paused effect does not update, and the DOM subtree becomes inert.
	 * @param {Effect} effect
	 * @param {() => void} [callback]
	 * @param {boolean} [destroy]
	 */
	function pause_effect(effect, callback, destroy = true) {
		/** @type {TransitionManager[]} */
		var transitions = [];

		pause_children(effect, transitions, true);

		var fn = () => {
			if (destroy) destroy_effect(effect);
			if (callback) callback();
		};

		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) {
				transition.out(check);
			}
		} else {
			fn();
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {TransitionManager[]} transitions
	 * @param {boolean} local
	 */
	function pause_children(effect, transitions, local) {
		if ((effect.f & INERT) !== 0) return;
		effect.f ^= INERT;

		var t = effect.nodes && effect.nodes.t;

		if (t !== null) {
			for (const transition of t) {
				if (transition.is_global || local) {
					transitions.push(transition);
				}
			}
		}

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;
			var transparent =
				(child.f & EFFECT_TRANSPARENT) !== 0 ||
				// If this is a branch effect without a block effect parent,
				// it means the parent block effect was pruned. In that case,
				// transparency information was transferred to the branch effect.
				((child.f & BRANCH_EFFECT) !== 0 && (effect.f & BLOCK_EFFECT) !== 0);
			// TODO we don't need to call pause_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			pause_children(child, transitions, transparent ? local : false);
			child = sibling;
		}
	}

	/**
	 * The opposite of `pause_effect`. We call this if (for example)
	 * `x` becomes falsy then truthy: `{#if x}...{/if}`
	 * @param {Effect} effect
	 */
	function resume_effect(effect) {
		resume_children(effect, true);
	}

	/**
	 * @param {Effect} effect
	 * @param {boolean} local
	 */
	function resume_children(effect, local) {
		if ((effect.f & INERT) === 0) return;
		effect.f ^= INERT;

		// If a dependency of this effect changed while it was paused,
		// schedule the effect to update. we don't use `is_dirty`
		// here because we don't want to eagerly recompute a derived like
		// `{#if foo}{foo.bar()}{/if}` if `foo` is now `undefined
		if ((effect.f & CLEAN) === 0) {
			set_signal_status(effect, DIRTY);
			schedule_effect(effect);
		}

		var child = effect.first;

		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
			// TODO we don't need to call resume_children recursively with a linked list in place
			// it's slightly more involved though as we have to account for `transparent` changing
			// through the tree.
			resume_children(child, transparent ? local : false);
			child = sibling;
		}

		var t = effect.nodes && effect.nodes.t;

		if (t !== null) {
			for (const transition of t) {
				if (transition.is_global || local) {
					transition.in();
				}
			}
		}
	}

	/**
	 * @param {Effect} effect
	 * @param {DocumentFragment} fragment
	 */
	function move_effect(effect, fragment) {
		if (!effect.nodes) return;

		/** @type {TemplateNode | null} */
		var node = effect.nodes.start;
		var end = effect.nodes.end;

		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : get_next_sibling(node);

			fragment.append(node);
			node = next;
		}
	}

	/** @import { Value } from '#client' */

	/**
	 * @type {Set<Value> | null}
	 * @deprecated
	 */
	let captured_signals = null;

	/**
	 * Capture an array of all the signals that are read when `fn` is called
	 * @template T
	 * @param {() => T} fn
	 */
	function capture_signals(fn) {
		var previous_captured_signals = captured_signals;

		try {
			captured_signals = new Set();

			untrack(fn);

			if (previous_captured_signals !== null) {
				for (var signal of captured_signals) {
					previous_captured_signals.add(signal);
				}
			}

			return captured_signals;
		} finally {
			captured_signals = previous_captured_signals;
		}
	}

	/**
	 * Invokes a function and captures all signals that are read during the invocation,
	 * then invalidates them.
	 * @param {() => any} fn
	 * @deprecated
	 */
	function invalidate_inner_signals(fn) {
		for (var signal of capture_signals(fn)) {
			internal_set(signal, signal.v);
		}
	}

	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

	let is_updating_effect = false;

	let is_destroying_effect = false;

	/** @param {boolean} value */
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}

	/** @type {null | Reaction} */
	let active_reaction = null;

	let untracking = false;

	/** @param {null | Reaction} reaction */
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}

	/** @type {null | Effect} */
	let active_effect = null;

	/** @param {null | Effect} effect */
	function set_active_effect(effect) {
		active_effect = effect;
	}

	/**
	 * When sources are created within a reaction, reading and writing
	 * them within that reaction should not cause a re-run
	 * @type {null | Source[]}
	 */
	let current_sources = null;

	/** @param {Value} value */
	function push_reaction_value(value) {
		if (active_reaction !== null && (true)) {
			if (current_sources === null) {
				current_sources = [value];
			} else {
				current_sources.push(value);
			}
		}
	}

	/**
	 * The dependencies of the reaction that is currently being executed. In many cases,
	 * the dependencies are unchanged between runs, and so this will be `null` unless
	 * and until a new dependency is accessed — we track this via `skipped_deps`
	 * @type {null | Value[]}
	 */
	let new_deps = null;

	let skipped_deps = 0;

	/**
	 * Tracks writes that the effect it's executed in doesn't listen to yet,
	 * so that the dependency can be added to the effect later on if it then reads it
	 * @type {null | Source[]}
	 */
	let untracked_writes = null;

	/** @param {null | Source[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}

	/**
	 * @type {number} Used by sources and deriveds for handling updates.
	 * Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
	 **/
	let write_version = 1;

	/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
	let read_version = 0;

	let update_version = read_version;

	/** @param {number} value */
	function set_update_version(value) {
		update_version = value;
	}

	function increment_write_version() {
		return ++write_version;
	}

	/**
	 * Determines whether a derived or effect is dirty.
	 * If it is MAYBE_DIRTY, will set the status to CLEAN
	 * @param {Reaction} reaction
	 * @returns {boolean}
	 */
	function is_dirty(reaction) {
		var flags = reaction.f;

		if ((flags & DIRTY) !== 0) {
			return true;
		}

		if (flags & DERIVED) {
			reaction.f &= ~WAS_MARKED;
		}

		if ((flags & MAYBE_DIRTY) !== 0) {
			var dependencies = /** @type {Value[]} */ (reaction.deps);
			var length = dependencies.length;

			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];

				if (is_dirty(/** @type {Derived} */ (dependency))) {
					update_derived(/** @type {Derived} */ (dependency));
				}

				if (dependency.wv > reaction.wv) {
					return true;
				}
			}

			if (
				(flags & CONNECTED) !== 0 &&
				// During time traveling we don't want to reset the status so that
				// traversal of the graph in the other batches still happens
				batch_values === null
			) {
				set_signal_status(reaction, CLEAN);
			}
		}

		return false;
	}

	/**
	 * @param {Value} signal
	 * @param {Effect} effect
	 * @param {boolean} [root]
	 */
	function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
		var reactions = signal.reactions;
		if (reactions === null) return;

		if (current_sources !== null && includes.call(current_sources, signal)) {
			return;
		}

		for (var i = 0; i < reactions.length; i++) {
			var reaction = reactions[i];

			if ((reaction.f & DERIVED) !== 0) {
				schedule_possible_effect_self_invalidation(/** @type {Derived} */ (reaction), effect, false);
			} else if (effect === reaction) {
				if (root) {
					set_signal_status(reaction, DIRTY);
				} else if ((reaction.f & CLEAN) !== 0) {
					set_signal_status(reaction, MAYBE_DIRTY);
				}
				schedule_effect(/** @type {Effect} */ (reaction));
			}
		}
	}

	/** @param {Reaction} reaction */
	function update_reaction(reaction) {
		var previous_deps = new_deps;
		var previous_skipped_deps = skipped_deps;
		var previous_untracked_writes = untracked_writes;
		var previous_reaction = active_reaction;
		var previous_sources = current_sources;
		var previous_component_context = component_context;
		var previous_untracking = untracking;
		var previous_update_version = update_version;

		var flags = reaction.f;

		new_deps = /** @type {null | Value[]} */ (null);
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;

		current_sources = null;
		set_component_context(reaction.ctx);
		untracking = false;
		update_version = ++read_version;

		if (reaction.ac !== null) {
			without_reactive_context(() => {
				/** @type {AbortController} */ (reaction.ac).abort(STALE_REACTION);
			});

			reaction.ac = null;
		}

		try {
			reaction.f |= REACTION_IS_UPDATING;
			var fn = /** @type {Function} */ (reaction.fn);
			var result = fn();
			reaction.f |= REACTION_RAN;
			var deps = reaction.deps;

			// Don't remove reactions during fork;
			// they must remain for when fork is discarded
			var is_fork = current_batch?.is_fork;

			if (new_deps !== null) {
				var i;

				if (!is_fork) {
					remove_reactions(reaction, skipped_deps);
				}

				if (deps !== null && skipped_deps > 0) {
					deps.length = skipped_deps + new_deps.length;
					for (i = 0; i < new_deps.length; i++) {
						deps[skipped_deps + i] = new_deps[i];
					}
				} else {
					reaction.deps = deps = new_deps;
				}

				if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
					for (i = skipped_deps; i < deps.length; i++) {
						(deps[i].reactions ??= []).push(reaction);
					}
				}
			} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
				remove_reactions(reaction, skipped_deps);
				deps.length = skipped_deps;
			}

			// If we're inside an effect and we have untracked writes, then we need to
			// ensure that if any of those untracked writes result in re-invalidation
			// of the current effect, then that happens accordingly
			if (
				is_runes() &&
				untracked_writes !== null &&
				!untracking &&
				deps !== null &&
				(reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0
			) {
				for (i = 0; i < /** @type {Source[]} */ (untracked_writes).length; i++) {
					schedule_possible_effect_self_invalidation(
						untracked_writes[i],
						/** @type {Effect} */ (reaction)
					);
				}
			}

			// If we are returning to an previous reaction then
			// we need to increment the read version to ensure that
			// any dependencies in this reaction aren't marked with
			// the same version
			if (previous_reaction !== null && previous_reaction !== reaction) {
				read_version++;

				// update the `rv` of the previous reaction's deps — both existing and new —
				// so that they are not added again
				if (previous_reaction.deps !== null) {
					for (let i = 0; i < previous_skipped_deps; i += 1) {
						previous_reaction.deps[i].rv = read_version;
					}
				}

				if (previous_deps !== null) {
					for (const dep of previous_deps) {
						dep.rv = read_version;
					}
				}

				if (untracked_writes !== null) {
					if (previous_untracked_writes === null) {
						previous_untracked_writes = untracked_writes;
					} else {
						previous_untracked_writes.push(.../** @type {Source[]} */ (untracked_writes));
					}
				}
			}

			if ((reaction.f & ERROR_VALUE) !== 0) {
				reaction.f ^= ERROR_VALUE;
			}

			return result;
		} catch (error) {
			return handle_error(error);
		} finally {
			reaction.f ^= REACTION_IS_UPDATING;
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			current_sources = previous_sources;
			set_component_context(previous_component_context);
			untracking = previous_untracking;
			update_version = previous_update_version;
		}
	}

	/**
	 * @template V
	 * @param {Reaction} signal
	 * @param {Value<V>} dependency
	 * @returns {void}
	 */
	function remove_reaction(signal, dependency) {
		let reactions = dependency.reactions;
		if (reactions !== null) {
			var index = index_of.call(reactions, signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) {
					reactions = dependency.reactions = null;
				} else {
					// Swap with last element and then remove.
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}

		// If the derived has no reactions, then we can disconnect it from the graph,
		// allowing it to either reconnect in the future, or be GC'd by the VM.
		if (
			reactions === null &&
			(dependency.f & DERIVED) !== 0 &&
			// Destroying a child effect while updating a parent effect can cause a dependency to appear
			// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
			// allows us to skip the expensive work of disconnecting and immediately reconnecting it
			(new_deps === null || !includes.call(new_deps, dependency))
		) {
			var derived = /** @type {Derived} */ (dependency);

			// If we are working with a derived that is owned by an effect, then mark it as being
			// disconnected and remove the mark flag, as it cannot be reliably removed otherwise
			if ((derived.f & CONNECTED) !== 0) {
				derived.f ^= CONNECTED;
				derived.f &= ~WAS_MARKED;
			}

			update_derived_status(derived);

			// freeze any effects inside this derived
			freeze_derived_effects(derived);

			// Disconnect any reactions owned by this reaction
			remove_reactions(derived, 0);
		}
	}

	/**
	 * @param {Reaction} signal
	 * @param {number} start_index
	 * @returns {void}
	 */
	function remove_reactions(signal, start_index) {
		var dependencies = signal.deps;
		if (dependencies === null) return;

		for (var i = start_index; i < dependencies.length; i++) {
			remove_reaction(signal, dependencies[i]);
		}
	}

	/**
	 * @param {Effect} effect
	 * @returns {void}
	 */
	function update_effect(effect) {
		var flags = effect.f;

		if ((flags & DESTROYED) !== 0) {
			return;
		}

		set_signal_status(effect, CLEAN);

		var previous_effect = active_effect;
		var was_updating_effect = is_updating_effect;

		active_effect = effect;
		is_updating_effect = true;

		try {
			if ((flags & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
				destroy_block_effect_children(effect);
			} else {
				destroy_effect_children(effect);
			}

			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === 'function' ? teardown : null;
			effect.wv = write_version;

			// In DEV, increment versions of any sources that were written to during the effect,
			// so that they are correctly marked as dirty when the effect re-runs
			var dep; if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
		} finally {
			is_updating_effect = was_updating_effect;
			active_effect = previous_effect;
		}
	}

	/**
	 * Returns a promise that resolves once any pending state changes have been applied.
	 * @returns {Promise<void>}
	 */
	async function tick() {

		await Promise.resolve();

		// By calling flushSync we guarantee that any pending state changes are applied after one tick.
		// TODO look into whether we can make flushing subsequent updates synchronously in the future.
		flushSync();
	}

	/**
	 * @template V
	 * @param {Value<V>} signal
	 * @returns {V}
	 */
	function get(signal) {
		var flags = signal.f;
		var is_derived = (flags & DERIVED) !== 0;

		captured_signals?.add(signal);

		// Register the dependency on the current reaction signal.
		if (active_reaction !== null && !untracking) {
			// if we're in a derived that is being read inside an _async_ derived,
			// it's possible that the effect was already destroyed. In this case,
			// we don't add the dependency, because that would create a memory leak
			var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;

			if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
				var deps = active_reaction.deps;

				if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
					// we're in the effect init/update cycle
					if (signal.rv < read_version) {
						signal.rv = read_version;

						// If the signal is accessing the same dependencies in the same
						// order as it did last time, increment `skipped_deps`
						// rather than updating `new_deps`, which creates GC cost
						if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
							skipped_deps++;
						} else if (new_deps === null) {
							new_deps = [signal];
						} else {
							new_deps.push(signal);
						}
					}
				} else {
					// we're adding a dependency outside the init/update cycle
					// (i.e. after an `await`)
					(active_reaction.deps ??= []).push(signal);

					var reactions = signal.reactions;

					if (reactions === null) {
						signal.reactions = [active_reaction];
					} else if (!includes.call(reactions, active_reaction)) {
						reactions.push(active_reaction);
					}
				}
			}
		}

		if (is_destroying_effect && old_values.has(signal)) {
			return old_values.get(signal);
		}

		if (is_derived) {
			var derived = /** @type {Derived} */ (signal);

			if (is_destroying_effect) {
				var value = derived.v;

				// if the derived is dirty and has reactions, or depends on the values that just changed, re-execute
				// (a derived can be maybe_dirty due to the effect destroy removing its last reaction)
				if (
					((derived.f & CLEAN) === 0 && derived.reactions !== null) ||
					depends_on_old_values(derived)
				) {
					value = execute_derived(derived);
				}

				old_values.set(derived, value);

				return value;
			}

			// connect disconnected deriveds if we are reading them inside an effect,
			// or inside another derived that is already connected
			var should_connect =
				(derived.f & CONNECTED) === 0 &&
				!untracking &&
				active_reaction !== null &&
				(is_updating_effect || (active_reaction.f & CONNECTED) !== 0);

			var is_new = (derived.f & REACTION_RAN) === 0;

			if (is_dirty(derived)) {
				if (should_connect) {
					// set the flag before `update_derived`, so that the derived
					// is added as a reaction to its dependencies
					derived.f |= CONNECTED;
				}

				update_derived(derived);
			}

			if (should_connect && !is_new) {
				unfreeze_derived_effects(derived);
				reconnect(derived);
			}
		}

		if (batch_values?.has(signal)) {
			return batch_values.get(signal);
		}

		if ((signal.f & ERROR_VALUE) !== 0) {
			throw signal.v;
		}

		return signal.v;
	}

	/**
	 * (Re)connect a disconnected derived, so that it is notified
	 * of changes in `mark_reactions`
	 * @param {Derived} derived
	 */
	function reconnect(derived) {
		derived.f |= CONNECTED;

		if (derived.deps === null) return;

		for (const dep of derived.deps) {
			(dep.reactions ??= []).push(derived);

			if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
				unfreeze_derived_effects(/** @type {Derived} */ (dep));
				reconnect(/** @type {Derived} */ (dep));
			}
		}
	}

	/** @param {Derived} derived */
	function depends_on_old_values(derived) {
		if (derived.v === UNINITIALIZED) return true; // we don't know, so assume the worst
		if (derived.deps === null) return false;

		for (const dep of derived.deps) {
			if (old_values.has(dep)) {
				return true;
			}

			if ((dep.f & DERIVED) !== 0 && depends_on_old_values(/** @type {Derived} */ (dep))) {
				return true;
			}
		}

		return false;
	}

	/**
	 * When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
	 * any state read inside `fn` will not be treated as a dependency.
	 *
	 * ```ts
	 * $effect(() => {
	 *   // this will run when `data` changes, but not when `time` changes
	 *   save(data, {
	 *     timestamp: untrack(() => time)
	 *   });
	 * });
	 * ```
	 * @template T
	 * @param {() => T} fn
	 * @returns {T}
	 */
	function untrack(fn) {
		var previous_untracking = untracking;
		try {
			untracking = true;
			return fn();
		} finally {
			untracking = previous_untracking;
		}
	}

	/**
	 * Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
	 * Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
	 * @param {any} value
	 * @returns {void}
	 */
	function deep_read_state(value) {
		if (typeof value !== 'object' || !value || value instanceof EventTarget) {
			return;
		}

		if (STATE_SYMBOL in value) {
			deep_read(value);
		} else if (!Array.isArray(value)) {
			for (let key in value) {
				const prop = value[key];
				if (typeof prop === 'object' && prop && STATE_SYMBOL in prop) {
					deep_read(prop);
				}
			}
		}
	}

	/**
	 * Deeply traverse an object and read all its properties
	 * so that they're all reactive in case this is `$state`
	 * @param {any} value
	 * @param {Set<any>} visited
	 * @returns {void}
	 */
	function deep_read(value, visited = new Set()) {
		if (
			typeof value === 'object' &&
			value !== null &&
			// We don't want to traverse DOM elements
			!(value instanceof EventTarget) &&
			!visited.has(value)
		) {
			visited.add(value);
			// When working with a possible SvelteDate, this
			// will ensure we capture changes to it.
			if (value instanceof Date) {
				value.getTime();
			}
			for (let key in value) {
				try {
					deep_read(value[key], visited);
				} catch (e) {
					// continue
				}
			}
			const proto = get_prototype_of(value);
			if (
				proto !== Object.prototype &&
				proto !== Array.prototype &&
				proto !== Map.prototype &&
				proto !== Set.prototype &&
				proto !== Date.prototype
			) {
				const descriptors = get_descriptors(proto);
				for (let key in descriptors) {
					const get = descriptors[key].get;
					if (get) {
						try {
							get.call(value);
						} catch (e) {
							// continue
						}
					}
				}
			}
		}
	}

	/**
	 * Used on elements, as a map of event type -> event handler,
	 * and on events themselves to track which element handled an event
	 */
	const event_symbol = Symbol('events');

	/** @type {Set<string>} */
	const all_registered_events = new Set();

	/** @type {Set<(events: Array<string>) => void>} */
	const root_event_handles = new Set();

	/**
	 * @param {string} event_name
	 * @param {EventTarget} dom
	 * @param {EventListener} [handler]
	 * @param {AddEventListenerOptions} [options]
	 */
	function create_event(event_name, dom, handler, options = {}) {
		/**
		 * @this {EventTarget}
		 */
		function target_handler(/** @type {Event} */ event) {
			if (!options.capture) {
				// Only call in the bubble phase, else delegated events would be called before the capturing events
				handle_event_propagation.call(dom, event);
			}
			if (!event.cancelBubble) {
				return without_reactive_context(() => {
					return handler?.call(this, event);
				});
			}
		}

		// Chrome has a bug where pointer events don't work when attached to a DOM element that has been cloned
		// with cloneNode() and the DOM element is disconnected from the document. To ensure the event works, we
		// defer the attachment till after it's been appended to the document. TODO: remove this once Chrome fixes
		// this bug. The same applies to wheel events and touch events.
		if (
			event_name.startsWith('pointer') ||
			event_name.startsWith('touch') ||
			event_name === 'wheel'
		) {
			queue_micro_task(() => {
				dom.addEventListener(event_name, target_handler, options);
			});
		} else {
			dom.addEventListener(event_name, target_handler, options);
		}

		return target_handler;
	}

	/**
	 * @param {string} event_name
	 * @param {Element} dom
	 * @param {EventListener} [handler]
	 * @param {boolean} [capture]
	 * @param {boolean} [passive]
	 * @returns {void}
	 */
	function event$1(event_name, dom, handler, capture, passive) {
		var options = { capture, passive };
		var target_handler = create_event(event_name, dom, handler, options);

		if (
			dom === document.body ||
			// @ts-ignore
			dom === window ||
			// @ts-ignore
			dom === document ||
			// Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
			dom instanceof HTMLMediaElement
		) {
			teardown(() => {
				dom.removeEventListener(event_name, target_handler, options);
			});
		}
	}

	// used to store the reference to the currently propagated event
	// to prevent garbage collection between microtasks in Firefox
	// If the event object is GCed too early, the expando __root property
	// set on the event object is lost, causing the event delegation
	// to process the event twice
	let last_propagated_event = null;

	/**
	 * @this {EventTarget}
	 * @param {Event} event
	 * @returns {void}
	 */
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = /** @type {Node} */ (handler_element).ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = /** @type {null | Element} */ (path[0] || event.target);

		last_propagated_event = event;

		// composedPath contains list of nodes the event has propagated through.
		// We check `event_symbol` to skip all nodes below it in case this is a
		// parent of the `event_symbol` node, which indicates that there's nested
		// mounted apps. In this case we don't want to trigger events multiple times.
		var path_idx = 0;

		// the `last_propagated_event === event` check is redundant, but
		// without it the variable will be DCE'd and things will
		// fail mysteriously in Firefox
		// @ts-expect-error is added below
		var handled_at = last_propagated_event === event && event[event_symbol];

		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (
				at_idx !== -1 &&
				(handler_element === document || handler_element === /** @type {any} */ (window))
			) {
				// This is the fallback document listener or a window listener, but the event was already handled
				// -> ignore, but set handle_at to document/window so that we're resetting the event
				// chain in case someone manually dispatches the same event object again.
				// @ts-expect-error
				event[event_symbol] = handler_element;
				return;
			}

			// We're deliberately not skipping if the index is higher, because
			// someone could create an event programmatically and emit it multiple times,
			// in which case we want to handle the whole propagation chain properly each time.
			// (this will only be a false negative if the event is dispatched multiple times and
			// the fallback document listener isn't reached in between, but that's super rare)
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) {
				// handle_idx can theoretically be -1 (happened in some JSDOM testing scenarios with an event listener on the window object)
				// so guard against that, too, and assume that everything was handled at this point.
				return;
			}

			if (at_idx <= handler_idx) {
				path_idx = at_idx;
			}
		}

		current_target = /** @type {Element} */ (path[path_idx] || event.target);
		// there can only be one delegated event per element, and we either already handled the current target,
		// or this is the very first target in the chain which has a non-delegated listener, in which case it's safe
		// to handle a possible delegated event on it later (through the root delegation listener for example).
		if (current_target === handler_element) return;

		// Proxy currentTarget to correct target
		define_property(event, 'currentTarget', {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});

		// This started because of Chromium issue https://chromestatus.com/feature/5128696823545856,
		// where removal or moving of of the DOM can cause sync `blur` events to fire, which can cause logic
		// to run inside the current `active_reaction`, which isn't what we want at all. However, on reflection,
		// it's probably best that all event handled by Svelte have this behaviour, as we don't really want
		// an event handler to run in the context of another reaction or effect.
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);

		try {
			/**
			 * @type {unknown}
			 */
			var throw_error;
			/**
			 * @type {unknown[]}
			 */
			var other_errors = [];

			while (current_target !== null) {
				/** @type {null | Element} */
				var parent_element =
					current_target.assignedSlot ||
					current_target.parentNode ||
					/** @type {any} */ (current_target).host ||
					null;

				try {
					// @ts-expect-error
					var delegated = current_target[event_symbol]?.[event_name];

					if (
						delegated != null &&
						(!(/** @type {any} */ (current_target).disabled) ||
							// DOM could've been updated already by the time this is reached, so we check this as well
							// -> the target could not have been disabled because it emits the event in the first place
							event.target === current_target)
					) {
						delegated.call(current_target, event);
					}
				} catch (error) {
					if (throw_error) {
						other_errors.push(error);
					} else {
						throw_error = error;
					}
				}
				if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
					break;
				}
				current_target = parent_element;
			}

			if (throw_error) {
				for (let error of other_errors) {
					// Throw the rest of the errors, one-by-one on a microtask
					queueMicrotask(() => {
						throw error;
					});
				}
				throw throw_error;
			}
		} finally {
			// @ts-expect-error is used above
			event[event_symbol] = handler_element;
			// @ts-ignore remove proxy on currentTarget
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}

	const policy =
		// We gotta write it like this because after downleveling the pure comment may end up in the wrong location
		globalThis?.window?.trustedTypes &&
		/* @__PURE__ */ globalThis.window.trustedTypes.createPolicy('svelte-trusted-html', {
			/** @param {string} html */
			createHTML: (html) => {
				return html;
			}
		});

	/** @param {string} html */
	function create_trusted_html(html) {
		return /** @type {string} */ (policy?.createHTML(html) ?? html);
	}

	/**
	 * @param {string} html
	 */
	function create_fragment_from_html(html) {
		var elem = create_element('template');
		elem.innerHTML = create_trusted_html(html.replaceAll('<!>', '<!---->')); // XHTML compliance
		return elem.content;
	}

	/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { TemplateStructure } from './types' */

	/**
	 * @param {TemplateNode} start
	 * @param {TemplateNode | null} end
	 */
	function assign_nodes(start, end) {
		var effect = /** @type {Effect} */ (active_effect);
		if (effect.nodes === null) {
			effect.nodes = { start, end, a: null, t: null };
		}
	}

	/**
	 * @param {string} content
	 * @param {number} flags
	 * @returns {() => Node | Node[]}
	 */
	/*#__NO_SIDE_EFFECTS__*/
	function from_html(content, flags) {
		var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
		var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;

		/** @type {Node} */
		var node;

		/**
		 * Whether or not the first item is a text/element node. If not, we need to
		 * create an additional comment node to act as `effect.nodes.start`
		 */
		var has_start = !content.startsWith('<!>');

		return () => {
			if (hydrating) {
				assign_nodes(hydrate_node, null);
				return hydrate_node;
			}

			if (node === undefined) {
				node = create_fragment_from_html(has_start ? content : '<!>' + content);
				if (!is_fragment) node = /** @type {TemplateNode} */ (get_first_child(node));
			}

			var clone = /** @type {TemplateNode} */ (
				use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
			);

			if (is_fragment) {
				var start = /** @type {TemplateNode} */ (get_first_child(clone));
				var end = /** @type {TemplateNode} */ (clone.lastChild);

				assign_nodes(start, end);
			} else {
				assign_nodes(clone, clone);
			}

			return clone;
		};
	}

	/**
	 * @returns {TemplateNode | DocumentFragment}
	 */
	function comment() {
		// we're not delegating to `template` here for performance reasons
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}

		var frag = document.createDocumentFragment();
		var start = document.createComment('');
		var anchor = create_text();
		frag.append(start, anchor);

		assign_nodes(start, anchor);

		return frag;
	}

	/**
	 * Assign the created (or in hydration mode, traversed) dom elements to the current block
	 * and insert the elements into the dom (in client mode).
	 * @param {Text | Comment | Element} anchor
	 * @param {DocumentFragment | Element} dom
	 */
	function append(anchor, dom) {
		if (hydrating) {
			var effect = /** @type {Effect & { nodes: EffectNodes }} */ (active_effect);

			// When hydrating and outer component and an inner component is async, i.e. blocked on a promise,
			// then by the time the inner resolves we have already advanced to the end of the hydrated nodes
			// of the parent component. Check for defined for that reason to avoid rewinding the parent's end marker.
			if ((effect.f & REACTION_RAN) === 0 || effect.nodes.end === null) {
				effect.nodes.end = hydrate_node;
			}

			hydrate_next();
			return;
		}

		if (anchor === null) {
			// edge case — void `<svelte:element>` with content
			return;
		}

		anchor.before(/** @type {Node} */ (dom));
	}

	/**
	 * Subset of delegated events which should be passive by default.
	 * These two are already passive via browser defaults on window, document and body.
	 * But since
	 * - we're delegating them
	 * - they happen often
	 * - they apply to mobile which is generally less performant
	 * we're marking them as passive by default for other elements, too.
	 */
	const PASSIVE_EVENTS = ['touchstart', 'touchmove'];

	/**
	 * Returns `true` if `name` is a passive event
	 * @param {string} name
	 */
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
	}

	/** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */

	/**
	 * @param {Element} text
	 * @param {string} value
	 * @returns {void}
	 */
	function set_text(text, value) {
		// For objects, we apply string coercion (which might make things like $state array references in the template reactive) before diffing
		var str = value == null ? '' : typeof value === 'object' ? `${value}` : value;
		// @ts-expect-error
		if (str !== (text.__t ??= text.nodeValue)) {
			// @ts-expect-error
			text.__t = str;
			text.nodeValue = `${str}`;
		}
	}

	/**
	 * Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
	 * Transitions will play during the initial render unless the `intro` option is set to `false`.
	 *
	 * @template {Record<string, any>} Props
	 * @template {Record<string, any>} Exports
	 * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
	 * @param {MountOptions<Props>} options
	 * @returns {Exports}
	 */
	function mount(component, options) {
		return _mount(component, options);
	}

	/**
	 * Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
	 *
	 * @template {Record<string, any>} Props
	 * @template {Record<string, any>} Exports
	 * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
	 * @param {{} extends Props ? {
	 * 		target: Document | Element | ShadowRoot;
	 * 		props?: Props;
	 * 		events?: Record<string, (e: any) => any>;
	 *  	context?: Map<any, any>;
	 * 		intro?: boolean;
	 * 		recover?: boolean;
	 *		transformError?: (error: unknown) => unknown;
	 * 	} : {
	 * 		target: Document | Element | ShadowRoot;
	 * 		props: Props;
	 * 		events?: Record<string, (e: any) => any>;
	 *  	context?: Map<any, any>;
	 * 		intro?: boolean;
	 * 		recover?: boolean;
	 *		transformError?: (error: unknown) => unknown;
	 * 	}} options
	 * @returns {Exports}
	 */
	function hydrate(component, options) {
		init_operations();
		options.intro = options.intro ?? false;
		const target = options.target;
		const was_hydrating = hydrating;
		const previous_hydrate_node = hydrate_node;

		try {
			var anchor = get_first_child(target);

			while (
				anchor &&
				(anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */ (anchor).data !== HYDRATION_START)
			) {
				anchor = get_next_sibling(anchor);
			}

			if (!anchor) {
				throw HYDRATION_ERROR;
			}

			set_hydrating(true);
			set_hydrate_node(/** @type {Comment} */ (anchor));

			const instance = _mount(component, { ...options, anchor });

			set_hydrating(false);

			return /**  @type {Exports} */ (instance);
		} catch (error) {
			// re-throw Svelte errors - they are certainly not related to hydration
			if (
				error instanceof Error &&
				error.message.split('\n').some((line) => line.startsWith('https://svelte.dev/e/'))
			) {
				throw error;
			}
			if (error !== HYDRATION_ERROR) {
				// eslint-disable-next-line no-console
				console.warn('Failed to hydrate: ', error);
			}

			if (options.recover === false) {
				hydration_failed();
			}

			// If an error occurred above, the operations might not yet have been initialised.
			init_operations();
			clear_text_content(target);

			set_hydrating(false);
			return mount(component, options);
		} finally {
			set_hydrating(was_hydrating);
			set_hydrate_node(previous_hydrate_node);
		}
	}

	/** @type {Map<EventTarget, Map<string, number>>} */
	const listeners = new Map();

	/**
	 * @template {Record<string, any>} Exports
	 * @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
	 * @param {MountOptions} options
	 * @returns {Exports}
	 */
	function _mount(
		Component,
		{ target, anchor, props = {}, events, context, intro = true, transformError }
	) {
		init_operations();

		/** @type {Exports} */
		// @ts-expect-error will be defined because the render effect runs synchronously
		var component = undefined;

		var unmount = component_root(() => {
			var anchor_node = anchor ?? target.appendChild(create_text());

			boundary(
				/** @type {TemplateNode} */ (anchor_node),
				{
					pending: () => {}
				},
				(anchor_node) => {
					push({});
					var ctx = /** @type {ComponentContext} */ (component_context);
					if (context) ctx.c = context;

					if (events) {
						// We can't spread the object or else we'd lose the state proxy stuff, if it is one
						/** @type {any} */ (props).$$events = events;
					}

					if (hydrating) {
						assign_nodes(/** @type {TemplateNode} */ (anchor_node), null);
					}
					// @ts-expect-error the public typings are not what the actual function looks like
					component = Component(anchor_node, props) || {};

					if (hydrating) {
						/** @type {Effect & { nodes: EffectNodes }} */ (active_effect).nodes.end = hydrate_node;

						if (
							hydrate_node === null ||
							hydrate_node.nodeType !== COMMENT_NODE ||
							/** @type {Comment} */ (hydrate_node).data !== HYDRATION_END
						) {
							hydration_mismatch();
							throw HYDRATION_ERROR;
						}
					}

					pop();
				},
				transformError
			);

			// Setup event delegation _after_ component is mounted - if an error would happen during mount, it would otherwise not be cleaned up
			/** @type {Set<string>} */
			var registered_events = new Set();

			/** @param {Array<string>} events */
			var event_handle = (events) => {
				for (var i = 0; i < events.length; i++) {
					var event_name = events[i];

					if (registered_events.has(event_name)) continue;
					registered_events.add(event_name);

					var passive = is_passive_event(event_name);

					// Add the event listener to both the container and the document.
					// The container listener ensures we catch events from within in case
					// the outer content stops propagation of the event.
					//
					// The document listener ensures we catch events that originate from elements that were
					// manually moved outside of the container (e.g. via manual portals).
					for (const node of [target, document]) {
						var counts = listeners.get(node);

						if (counts === undefined) {
							counts = new Map();
							listeners.set(node, counts);
						}

						var count = counts.get(event_name);

						if (count === undefined) {
							node.addEventListener(event_name, handle_event_propagation, { passive });
							counts.set(event_name, 1);
						} else {
							counts.set(event_name, count + 1);
						}
					}
				}
			};

			event_handle(array_from(all_registered_events));
			root_event_handles.add(event_handle);

			return () => {
				for (var event_name of registered_events) {
					for (const node of [target, document]) {
						var counts = /** @type {Map<string, number>} */ (listeners.get(node));
						var count = /** @type {number} */ (counts.get(event_name));

						if (--count == 0) {
							node.removeEventListener(event_name, handle_event_propagation);
							counts.delete(event_name);

							if (counts.size === 0) {
								listeners.delete(node);
							}
						} else {
							counts.set(event_name, count);
						}
					}
				}

				root_event_handles.delete(event_handle);

				if (anchor_node !== anchor) {
					anchor_node.parentNode?.removeChild(anchor_node);
				}
			};
		});

		mounted_components.set(component, unmount);
		return component;
	}

	/**
	 * References of the components that were mounted or hydrated.
	 * Uses a `WeakMap` to avoid memory leaks.
	 */
	let mounted_components = new WeakMap();

	/**
	 * Unmounts a component that was previously mounted using `mount` or `hydrate`.
	 *
	 * Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
	 *
	 * Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
	 *
	 * ```js
	 * import { mount, unmount } from 'svelte';
	 * import App from './App.svelte';
	 *
	 * const app = mount(App, { target: document.body });
	 *
	 * // later...
	 * unmount(app, { outro: true });
	 * ```
	 * @param {Record<string, any>} component
	 * @param {{ outro?: boolean }} [options]
	 * @returns {Promise<void>}
	 */
	function unmount(component, options) {
		const fn = mounted_components.get(component);

		if (fn) {
			mounted_components.delete(component);
			return fn(options);
		}

		return Promise.resolve();
	}

	/** @import { Effect, TemplateNode } from '#client' */

	/**
	 * @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
	 */

	/**
	 * @template Key
	 */
	class BranchManager {
		/** @type {TemplateNode} */
		anchor;

		/** @type {Map<Batch, Key>} */
		#batches = new Map();

		/**
		 * Map of keys to effects that are currently rendered in the DOM.
		 * These effects are visible and actively part of the document tree.
		 * Example:
		 * ```
		 * {#if condition}
		 * 	foo
		 * {:else}
		 * 	bar
		 * {/if}
		 * ```
		 * Can result in the entries `true->Effect` and `false->Effect`
		 * @type {Map<Key, Effect>}
		 */
		#onscreen = new Map();

		/**
		 * Similar to #onscreen with respect to the keys, but contains branches that are not yet
		 * in the DOM, because their insertion is deferred.
		 * @type {Map<Key, Branch>}
		 */
		#offscreen = new Map();

		/**
		 * Keys of effects that are currently outroing
		 * @type {Set<Key>}
		 */
		#outroing = new Set();

		/**
		 * Whether to pause (i.e. outro) on change, or destroy immediately.
		 * This is necessary for `<svelte:element>`
		 */
		#transition = true;

		/**
		 * @param {TemplateNode} anchor
		 * @param {boolean} transition
		 */
		constructor(anchor, transition = true) {
			this.anchor = anchor;
			this.#transition = transition;
		}

		#commit = () => {
			var batch = /** @type {Batch} */ (current_batch);

			// if this batch was made obsolete, bail
			if (!this.#batches.has(batch)) return;

			var key = /** @type {Key} */ (this.#batches.get(batch));

			var onscreen = this.#onscreen.get(key);

			if (onscreen) {
				// effect is already in the DOM — abort any current outro
				resume_effect(onscreen);
				this.#outroing.delete(key);
			} else {
				// effect is currently offscreen. put it in the DOM
				var offscreen = this.#offscreen.get(key);

				if (offscreen) {
					this.#onscreen.set(key, offscreen.effect);
					this.#offscreen.delete(key);

					// remove the anchor...
					/** @type {TemplateNode} */ (offscreen.fragment.lastChild).remove();

					// ...and append the fragment
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}

			for (const [b, k] of this.#batches) {
				this.#batches.delete(b);

				if (b === batch) {
					// keep values for newer batches
					break;
				}

				const offscreen = this.#offscreen.get(k);

				if (offscreen) {
					// for older batches, destroy offscreen effects
					// as they will never be committed
					destroy_effect(offscreen.effect);
					this.#offscreen.delete(k);
				}
			}

			// outro/destroy all onscreen effects...
			for (const [k, effect] of this.#onscreen) {
				// ...except the one that was just committed
				//    or those that are already outroing (else the transition is aborted and the effect destroyed right away)
				if (k === key || this.#outroing.has(k)) continue;

				const on_destroy = () => {
					const keys = Array.from(this.#batches.values());

					if (keys.includes(k)) {
						// keep the effect offscreen, as another batch will need it
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);

						fragment.append(create_text()); // TODO can we avoid this?

						this.#offscreen.set(k, { effect, fragment });
					} else {
						destroy_effect(effect);
					}

					this.#outroing.delete(k);
					this.#onscreen.delete(k);
				};

				if (this.#transition || !onscreen) {
					this.#outroing.add(k);
					pause_effect(effect, on_destroy, false);
				} else {
					on_destroy();
				}
			}
		};

		/**
		 * @param {Batch} batch
		 */
		#discard = (batch) => {
			this.#batches.delete(batch);

			const keys = Array.from(this.#batches.values());

			for (const [k, branch] of this.#offscreen) {
				if (!keys.includes(k)) {
					destroy_effect(branch.effect);
					this.#offscreen.delete(k);
				}
			}
		};

		/**
		 *
		 * @param {any} key
		 * @param {null | ((target: TemplateNode) => void)} fn
		 */
		ensure(key, fn) {
			var batch = /** @type {Batch} */ (current_batch);
			var defer = should_defer_append();

			if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
				if (defer) {
					var fragment = document.createDocumentFragment();
					var target = create_text();

					fragment.append(target);

					this.#offscreen.set(key, {
						effect: branch(() => fn(target)),
						fragment
					});
				} else {
					this.#onscreen.set(
						key,
						branch(() => fn(this.anchor))
					);
				}
			}

			this.#batches.set(batch, key);

			if (defer) {
				for (const [k, effect] of this.#onscreen) {
					if (k === key) {
						batch.unskip_effect(effect);
					} else {
						batch.skip_effect(effect);
					}
				}

				for (const [k, branch] of this.#offscreen) {
					if (k === key) {
						batch.unskip_effect(branch.effect);
					} else {
						batch.skip_effect(branch.effect);
					}
				}

				batch.oncommit(this.#commit);
				batch.ondiscard(this.#discard);
			} else {
				if (hydrating) {
					this.anchor = hydrate_node;
				}

				this.#commit();
			}
		}
	}

	/** @import { ComponentContext, ComponentContextLegacy } from '#client' */
	/** @import { EventDispatcher } from './index.js' */
	/** @import { NotFunction } from './internal/types.js' */

	/**
	 * `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
	 * Unlike `$effect`, the provided function only runs once.
	 *
	 * It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
	 * it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
	 * it will be called when the component is unmounted.
	 *
	 * `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
	 *
	 * @template T
	 * @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
	 * @returns {void}
	 */
	function onMount(fn) {
		if (component_context === null) {
			lifecycle_outside_component();
		}

		if (legacy_mode_flag && component_context.l !== null) {
			init_update_callbacks(component_context).m.push(fn);
		} else {
			user_effect(() => {
				const cleanup = untrack(fn);
				if (typeof cleanup === 'function') return /** @type {() => void} */ (cleanup);
			});
		}
	}

	/**
	 * Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
	 * @param {ComponentContext} context
	 */
	function init_update_callbacks(context) {
		var l = /** @type {ComponentContextLegacy} */ (context).l;
		return (l.u ??= { a: [], b: [], m: [] });
	}

	/** @import { TemplateNode } from '#client' */

	/**
	 * @param {TemplateNode} node
	 * @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
	 * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
	 * @returns {void}
	 */
	function if_block(node, fn, elseif = false) {
		if (hydrating) {
			hydrate_next();
		}

		var branches = new BranchManager(node);
		var flags = elseif ? EFFECT_TRANSPARENT : 0;

		/**
		 * @param {number | false} key
		 * @param {null | ((anchor: Node) => void)} fn
		 */
		function update_branch(key, fn) {
			if (hydrating) {
				const data = read_hydration_instruction(node);

				/**
				 * @type {number | false}
				 * "[" = branch 0, "[1" = branch 1, "[2" = branch 2, ..., "[!" = else (false)
				 */
				var hydrated_key;

				if (data === HYDRATION_START) {
					hydrated_key = 0;
				} else if (data === HYDRATION_START_ELSE) {
					hydrated_key = false;
				} else {
					hydrated_key = parseInt(data.substring(1)); // "[1", "[2", etc.
				}

				if (key !== hydrated_key) {
					// Hydration mismatch: remove everything inside the anchor and start fresh.
					// This could happen with `{#if browser}...{/if}`, for example
					var anchor = skip_nodes();

					set_hydrate_node(anchor);
					branches.anchor = anchor;

					set_hydrating(false);
					branches.ensure(key, fn);
					set_hydrating(true);

					return;
				}
			}

			branches.ensure(key, fn);
		}

		block(() => {
			var has_branch = false;

			fn((fn, key = 0) => {
				has_branch = true;
				update_branch(key, fn);
			});

			if (!has_branch) {
				update_branch(false, null);
			}
		}, flags);
	}

	/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
	/** @import { Batch } from '../../reactivity/batch.js'; */

	// When making substantive changes to this file, validate them with the each block stress test:
	// https://svelte.dev/playground/1972b2cf46564476ad8c8c6405b23b7b
	// This test also exists in this repo, as `packages/svelte/tests/manual/each-stress-test`

	/**
	 * @param {any} _
	 * @param {number} i
	 */
	function index(_, i) {
		return i;
	}

	/**
	 * Pause multiple effects simultaneously, and coordinate their
	 * subsequent destruction. Used in each blocks
	 * @param {EachState} state
	 * @param {Effect[]} to_destroy
	 * @param {null | Node} controlled_anchor
	 */
	function pause_effects(state, to_destroy, controlled_anchor) {
		/** @type {TransitionManager[]} */
		var transitions = [];
		var length = to_destroy.length;

		/** @type {EachOutroGroup} */
		var group;
		var remaining = to_destroy.length;

		for (var i = 0; i < length; i++) {
			let effect = to_destroy[i];

			pause_effect(
				effect,
				() => {
					if (group) {
						group.pending.delete(effect);
						group.done.add(effect);

						if (group.pending.size === 0) {
							var groups = /** @type {Set<EachOutroGroup>} */ (state.outrogroups);

							destroy_effects(array_from(group.done));
							groups.delete(group);

							if (groups.size === 0) {
								state.outrogroups = null;
							}
						}
					} else {
						remaining -= 1;
					}
				},
				false
			);
		}

		if (remaining === 0) {
			// If we're in a controlled each block (i.e. the block is the only child of an
			// element), and we are removing all items, _and_ there are no out transitions,
			// we can use the fast path — emptying the element and replacing the anchor
			var fast_path = transitions.length === 0 && controlled_anchor !== null;

			if (fast_path) {
				var anchor = /** @type {Element} */ (controlled_anchor);
				var parent_node = /** @type {Element} */ (anchor.parentNode);

				clear_text_content(parent_node);
				parent_node.append(anchor);

				state.items.clear();
			}

			destroy_effects(to_destroy, !fast_path);
		} else {
			group = {
				pending: new Set(to_destroy),
				done: new Set()
			};

			(state.outrogroups ??= new Set()).add(group);
		}
	}

	/**
	 * @param {Effect[]} to_destroy
	 * @param {boolean} remove_dom
	 */
	function destroy_effects(to_destroy, remove_dom = true) {
		// TODO only destroy effects if no pending batch needs them. otherwise,
		// just re-add the `EFFECT_OFFSCREEN` flag
		for (var i = 0; i < to_destroy.length; i++) {
			destroy_effect(to_destroy[i], remove_dom);
		}
	}

	/** @type {TemplateNode} */
	var offscreen_anchor;

	/**
	 * @template V
	 * @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @param {(value: V, index: number) => any} get_key
	 * @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
	 * @param {null | ((anchor: Node) => void)} fallback_fn
	 * @returns {void}
	 */
	function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
		var anchor = node;

		/** @type {Map<any, EachItem>} */
		var items = new Map();

		if (hydrating) {
			hydrate_next();
		}

		/** @type {Effect | null} */
		var fallback = null;

		// TODO: ideally we could use derived for runes mode but because of the ability
		// to use a store which can be mutated, we can't do that here as mutating a store
		// will still result in the collection array being the same from the store
		var each_array = derived_safe_equal(() => {
			var collection = get_collection();

			return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
		});

		/** @type {V[]} */
		var array;

		var first_run = true;

		function commit() {
			state.fallback = fallback;
			reconcile(state, array, anchor, flags, get_key);

			if (fallback !== null) {
				if (array.length === 0) {
					if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
						resume_effect(fallback);
					} else {
						fallback.f ^= EFFECT_OFFSCREEN;
						move(fallback, null, anchor);
					}
				} else {
					pause_effect(fallback, () => {
						// TODO only null out if no pending batch needs it,
						// otherwise re-add `fallback.fragment` and move the
						// effect into it
						fallback = null;
					});
				}
			}
		}

		var effect = block(() => {
			array = /** @type {V[]} */ (get(each_array));
			var length = array.length;

			/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
			let mismatch = false;

			if (hydrating) {
				var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;

				if (is_else !== (length === 0)) {
					// hydration mismatch — remove the server-rendered DOM and start over
					anchor = skip_nodes();

					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}

			var keys = new Set();
			var batch = /** @type {Batch} */ (current_batch);
			var defer = should_defer_append();

			for (var index = 0; index < length; index += 1) {
				if (
					hydrating &&
					hydrate_node.nodeType === COMMENT_NODE &&
					/** @type {Comment} */ (hydrate_node).data === HYDRATION_END
				) {
					// The server rendered fewer items than expected,
					// so break out and continue appending non-hydrated items
					anchor = /** @type {Comment} */ (hydrate_node);
					mismatch = true;
					set_hydrating(false);
				}

				var value = array[index];
				var key = get_key(value, index);

				var item = first_run ? null : items.get(key);

				if (item) {
					// update before reconciliation, to trigger any async updates
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);

					if (defer) {
						batch.unskip_effect(item.e);
					}
				} else {
					item = create_item(
						items,
						first_run ? anchor : (offscreen_anchor ??= create_text()),
						value,
						key,
						index,
						render_fn,
						flags,
						get_collection
					);

					if (!first_run) {
						item.e.f |= EFFECT_OFFSCREEN;
					}

					items.set(key, item);
				}

				keys.add(key);
			}

			if (length === 0 && fallback_fn && !fallback) {
				if (first_run) {
					fallback = branch(() => fallback_fn(anchor));
				} else {
					fallback = branch(() => fallback_fn((offscreen_anchor ??= create_text())));
					fallback.f |= EFFECT_OFFSCREEN;
				}
			}

			if (length > keys.size) {
				{
					// in prod, the additional information isn't printed, so don't bother computing it
					each_key_duplicate();
				}
			}

			// remove excess nodes
			if (hydrating && length > 0) {
				set_hydrate_node(skip_nodes());
			}

			if (!first_run) {
				if (defer) {
					for (const [key, item] of items) {
						if (!keys.has(key)) {
							batch.skip_effect(item.e);
						}
					}

					batch.oncommit(commit);
					batch.ondiscard(() => {
						// TODO presumably we need to do something here?
					});
				} else {
					commit();
				}
			}

			if (mismatch) {
				// continue in hydration mode
				set_hydrating(true);
			}

			// When we mount the each block for the first time, the collection won't be
			// connected to this effect as the effect hasn't finished running yet and its deps
			// won't be assigned. However, it's possible that when reconciling the each block
			// that a mutation occurred and it's made the collection MAYBE_DIRTY, so reading the
			// collection again can provide consistency to the reactive graph again as the deriveds
			// will now be `CLEAN`.
			get(each_array);
		});

		/** @type {EachState} */
		var state = { effect, items, outrogroups: null, fallback };

		first_run = false;

		if (hydrating) {
			anchor = hydrate_node;
		}
	}

	/**
	 * Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
	 * @param {Effect | null} effect
	 * @returns {Effect | null}
	 */
	function skip_to_branch(effect) {
		while (effect !== null && (effect.f & BRANCH_EFFECT) === 0) {
			effect = effect.next;
		}
		return effect;
	}

	/**
	 * Add, remove, or reorder items output by an each block as its input changes
	 * @template V
	 * @param {EachState} state
	 * @param {Array<V>} array
	 * @param {Element | Comment | Text} anchor
	 * @param {number} flags
	 * @param {(value: V, index: number) => any} get_key
	 * @returns {void}
	 */
	function reconcile(state, array, anchor, flags, get_key) {

		var length = array.length;
		var items = state.items;
		var current = skip_to_branch(state.effect.first);

		/** @type {undefined | Set<Effect>} */
		var seen;

		/** @type {Effect | null} */
		var prev = null;

		/** @type {Effect[]} */
		var matched = [];

		/** @type {Effect[]} */
		var stashed = [];

		/** @type {V} */
		var value;

		/** @type {any} */
		var key;

		/** @type {Effect | undefined} */
		var effect;

		/** @type {number} */
		var i;

		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);

			effect = /** @type {EachItem} */ (items.get(key)).e;

			if (state.outrogroups !== null) {
				for (const group of state.outrogroups) {
					group.pending.delete(effect);
					group.done.delete(effect);
				}
			}

			if ((effect.f & EFFECT_OFFSCREEN) !== 0) {
				effect.f ^= EFFECT_OFFSCREEN;

				if (effect === current) {
					move(effect, null, anchor);
				} else {
					var next = prev ? prev.next : current;

					if (effect === state.effect.last) {
						state.effect.last = effect.prev;
					}

					if (effect.prev) effect.prev.next = effect.next;
					if (effect.next) effect.next.prev = effect.prev;
					link(state, prev, effect);
					link(state, effect, next);

					move(effect, next, anchor);
					prev = effect;

					matched = [];
					stashed = [];

					current = skip_to_branch(prev.next);
					continue;
				}
			}

			if ((effect.f & INERT) !== 0) {
				resume_effect(effect);
			}

			if (effect !== current) {
				if (seen !== undefined && seen.has(effect)) {
					if (matched.length < stashed.length) {
						// more efficient to move later items to the front
						var start = stashed[0];
						var j;

						prev = start.prev;

						var a = matched[0];
						var b = matched[matched.length - 1];

						for (j = 0; j < matched.length; j += 1) {
							move(matched[j], start, anchor);
						}

						for (j = 0; j < stashed.length; j += 1) {
							seen.delete(stashed[j]);
						}

						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);

						current = start;
						prev = b;
						i -= 1;

						matched = [];
						stashed = [];
					} else {
						// more efficient to move earlier items to the back
						seen.delete(effect);
						move(effect, current, anchor);

						link(state, effect.prev, effect.next);
						link(state, effect, prev === null ? state.effect.first : prev.next);
						link(state, prev, effect);

						prev = effect;
					}

					continue;
				}

				matched = [];
				stashed = [];

				while (current !== null && current !== effect) {
					(seen ??= new Set()).add(current);
					stashed.push(current);
					current = skip_to_branch(current.next);
				}

				if (current === null) {
					continue;
				}
			}

			if ((effect.f & EFFECT_OFFSCREEN) === 0) {
				matched.push(effect);
			}

			prev = effect;
			current = skip_to_branch(effect.next);
		}

		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) {
				if (group.pending.size === 0) {
					destroy_effects(array_from(group.done));
					state.outrogroups?.delete(group);
				}
			}

			if (state.outrogroups.size === 0) {
				state.outrogroups = null;
			}
		}

		if (current !== null || seen !== undefined) {
			/** @type {Effect[]} */
			var to_destroy = [];

			if (seen !== undefined) {
				for (effect of seen) {
					if ((effect.f & INERT) === 0) {
						to_destroy.push(effect);
					}
				}
			}

			while (current !== null) {
				// If the each block isn't inert, then inert effects are currently outroing and will be removed once the transition is finished
				if ((current.f & INERT) === 0 && current !== state.fallback) {
					to_destroy.push(current);
				}

				current = skip_to_branch(current.next);
			}

			var destroy_length = to_destroy.length;

			if (destroy_length > 0) {
				var controlled_anchor = null;

				pause_effects(state, to_destroy, controlled_anchor);
			}
		}
	}

	/**
	 * @template V
	 * @param {Map<any, EachItem>} items
	 * @param {Node} anchor
	 * @param {V} value
	 * @param {unknown} key
	 * @param {number} index
	 * @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
	 * @param {number} flags
	 * @param {() => V[]} get_collection
	 * @returns {EachItem}
	 */
	function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
		var v =
			(flags & EACH_ITEM_REACTIVE) !== 0
				? (flags & EACH_ITEM_IMMUTABLE) === 0
					? mutable_source(value, false, false)
					: source(value)
				: null;

		var i = (flags & EACH_INDEX_REACTIVE) !== 0 ? source(index) : null;

		return {
			v,
			i,
			e: branch(() => {
				render_fn(anchor, v ?? value, i ?? index, get_collection);

				return () => {
					items.delete(key);
				};
			})
		};
	}

	/**
	 * @param {Effect} effect
	 * @param {Effect | null} next
	 * @param {Text | Element | Comment} anchor
	 */
	function move(effect, next, anchor) {
		if (!effect.nodes) return;

		var node = effect.nodes.start;
		var end = effect.nodes.end;

		var dest =
			next && (next.f & EFFECT_OFFSCREEN) === 0
				? /** @type {EffectNodes} */ (next.nodes).start
				: anchor;

		while (node !== null) {
			var next_node = /** @type {TemplateNode} */ (get_next_sibling(node));
			dest.before(node);

			if (node === end) {
				return;
			}

			node = next_node;
		}
	}

	/**
	 * @param {EachState} state
	 * @param {Effect | null} prev
	 * @param {Effect | null} next
	 */
	function link(state, prev, next) {
		if (prev === null) {
			state.effect.first = next;
		} else {
			prev.next = next;
		}

		if (next === null) {
			state.effect.last = prev;
		} else {
			next.prev = prev;
		}
	}

	/**
	 * @param {Comment} anchor
	 * @param {Record<string, any>} $$props
	 * @param {string} name
	 * @param {Record<string, unknown>} slot_props
	 * @param {null | ((anchor: Comment) => void)} fallback_fn
	 */
	function slot(anchor, $$props, name, slot_props, fallback_fn) {
		if (hydrating) {
			hydrate_next();
		}

		var slot_fn = $$props.$$slots?.[name];
		// Interop: Can use snippets to fill slots
		var is_interop = false;
		if (slot_fn === true) {
			slot_fn = $$props['children' ];
			is_interop = true;
		}

		if (slot_fn === undefined) {
			if (fallback_fn !== null) {
				fallback_fn(anchor);
			}
		} else {
			slot_fn(anchor, is_interop ? () => slot_props : slot_props);
		}
	}

	/**
	 * @param {Node} anchor
	 * @param {{ hash: string, code: string }} css
	 */
	function append_styles$1(anchor, css) {
		// Use `queue_micro_task` to ensure `anchor` is in the DOM, otherwise getRootNode() will yield wrong results
		effect(() => {
			var root = anchor.getRootNode();

			var target = /** @type {ShadowRoot} */ (root).host
				? /** @type {ShadowRoot} */ (root)
				: /** @type {Document} */ (root).head ?? /** @type {Document} */ (root.ownerDocument).head;

			// Always querying the DOM is roughly the same perf as additionally checking for presence in a map first assuming
			// that you'll get cache hits half of the time, so we just always query the dom for simplicity and code savings.
			if (!target.querySelector('#' + css.hash)) {
				const style = create_element('style');
				style.id = css.hash;
				style.textContent = css.code;

				target.appendChild(style);
			}
		});
	}

	/** @import { ActionPayload } from '#client' */

	/**
	 * @template P
	 * @param {Element} dom
	 * @param {(dom: Element, value?: P) => ActionPayload<P>} action
	 * @param {() => P} [get_value]
	 * @returns {void}
	 */
	function action(dom, action, get_value) {
		effect(() => {
			var payload = untrack(() => action(dom, get_value?.()) || {});

			if (payload?.destroy) {
				return () => /** @type {Function} */ (payload.destroy)();
			}
		});
	}

	const whitespace = [...' \t\n\r\f\u00a0\u000b\ufeff'];

	/**
	 * @param {any} value
	 * @param {string | null} [hash]
	 * @param {Record<string, boolean>} [directives]
	 * @returns {string | null}
	 */
	function to_class(value, hash, directives) {
		var classname = value == null ? '' : '' + value;

		if (hash) {
			classname = classname ? classname + ' ' + hash : hash;
		}

		if (directives) {
			for (var key of Object.keys(directives)) {
				if (directives[key]) {
					classname = classname ? classname + ' ' + key : key;
				} else if (classname.length) {
					var len = key.length;
					var a = 0;

					while ((a = classname.indexOf(key, a)) >= 0) {
						var b = a + len;

						if (
							(a === 0 || whitespace.includes(classname[a - 1])) &&
							(b === classname.length || whitespace.includes(classname[b]))
						) {
							classname = (a === 0 ? '' : classname.substring(0, a)) + classname.substring(b + 1);
						} else {
							a = b;
						}
					}
				}
			}
		}

		return classname === '' ? null : classname;
	}

	/**
	 *
	 * @param {Record<string,any>} styles
	 * @param {boolean} important
	 */
	function append_styles(styles, important = false) {
		var separator = important ? ' !important;' : ';';
		var css = '';

		for (var key of Object.keys(styles)) {
			var value = styles[key];
			if (value != null && value !== '') {
				css += ' ' + key + ': ' + value + separator;
			}
		}

		return css;
	}

	/**
	 * @param {string} name
	 * @returns {string}
	 */
	function to_css_name(name) {
		if (name[0] !== '-' || name[1] !== '-') {
			return name.toLowerCase();
		}
		return name;
	}

	/**
	 * @param {any} value
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
	 * @returns {string | null}
	 */
	function to_style(value, styles) {
		if (styles) {
			var new_style = '';

			/** @type {Record<string,any> | undefined} */
			var normal_styles;

			/** @type {Record<string,any> | undefined} */
			var important_styles;

			if (Array.isArray(styles)) {
				normal_styles = styles[0];
				important_styles = styles[1];
			} else {
				normal_styles = styles;
			}

			if (value) {
				value = String(value)
					.replaceAll(/\s*\/\*.*?\*\/\s*/g, '')
					.trim();

				/** @type {boolean | '"' | "'"} */
				var in_str = false;
				var in_apo = 0;
				var in_comment = false;

				var reserved_names = [];

				if (normal_styles) {
					reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
				}
				if (important_styles) {
					reserved_names.push(...Object.keys(important_styles).map(to_css_name));
				}

				var start_index = 0;
				var name_index = -1;

				const len = value.length;
				for (var i = 0; i < len; i++) {
					var c = value[i];

					if (in_comment) {
						if (c === '/' && value[i - 1] === '*') {
							in_comment = false;
						}
					} else if (in_str) {
						if (in_str === c) {
							in_str = false;
						}
					} else if (c === '/' && value[i + 1] === '*') {
						in_comment = true;
					} else if (c === '"' || c === "'") {
						in_str = c;
					} else if (c === '(') {
						in_apo++;
					} else if (c === ')') {
						in_apo--;
					}

					if (!in_comment && in_str === false && in_apo === 0) {
						if (c === ':' && name_index === -1) {
							name_index = i;
						} else if (c === ';' || i === len - 1) {
							if (name_index !== -1) {
								var name = to_css_name(value.substring(start_index, name_index).trim());

								if (!reserved_names.includes(name)) {
									if (c !== ';') {
										i++;
									}

									var property = value.substring(start_index, i).trim();
									new_style += ' ' + property + ';';
								}
							}

							start_index = i + 1;
							name_index = -1;
						}
					}
				}
			}

			if (normal_styles) {
				new_style += append_styles(normal_styles);
			}

			if (important_styles) {
				new_style += append_styles(important_styles, true);
			}

			new_style = new_style.trim();
			return new_style === '' ? null : new_style;
		}

		return value == null ? null : String(value);
	}

	/**
	 * @param {Element} dom
	 * @param {boolean | number} is_html
	 * @param {string | null} value
	 * @param {string} [hash]
	 * @param {Record<string, any>} [prev_classes]
	 * @param {Record<string, any>} [next_classes]
	 * @returns {Record<string, boolean> | undefined}
	 */
	function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
		// @ts-expect-error need to add __className to patched prototype
		var prev = dom.__className;

		if (
			hydrating ||
			prev !== value ||
			prev === undefined // for edge case of `class={undefined}`
		) {
			var next_class_name = to_class(value, hash, next_classes);

			if (!hydrating || next_class_name !== dom.getAttribute('class')) {
				// Removing the attribute when the value is only an empty string causes
				// performance issues vs simply making the className an empty string. So
				// we should only remove the class if the value is nullish
				// and there no hash/directives :
				if (next_class_name == null) {
					dom.removeAttribute('class');
				} else {
					dom.className = next_class_name;
				}
			}

			// @ts-expect-error need to add __className to patched prototype
			dom.__className = value;
		} else if (next_classes && prev_classes !== next_classes) {
			for (var key in next_classes) {
				var is_present = !!next_classes[key];

				if (prev_classes == null || is_present !== !!prev_classes[key]) {
					dom.classList.toggle(key, is_present);
				}
			}
		}

		return next_classes;
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} dom
	 * @param {Record<string, any>} prev
	 * @param {Record<string, any>} next
	 * @param {string} [priority]
	 */
	function update_styles(dom, prev = {}, next, priority) {
		for (var key in next) {
			var value = next[key];

			if (prev[key] !== value) {
				if (next[key] == null) {
					dom.style.removeProperty(key);
				} else {
					dom.style.setProperty(key, value, priority);
				}
			}
		}
	}

	/**
	 * @param {Element & ElementCSSInlineStyle} dom
	 * @param {string | null} value
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
	 * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
	 */
	function set_style(dom, value, prev_styles, next_styles) {
		// @ts-expect-error
		var prev = dom.__style;

		if (hydrating || prev !== value) {
			var next_style_attr = to_style(value, next_styles);

			if (!hydrating || next_style_attr !== dom.getAttribute('style')) {
				if (next_style_attr == null) {
					dom.removeAttribute('style');
				} else {
					dom.style.cssText = next_style_attr;
				}
			}

			// @ts-expect-error
			dom.__style = value;
		} else if (next_styles) {
			if (Array.isArray(next_styles)) {
				update_styles(dom, prev_styles?.[0], next_styles[0]);
				update_styles(dom, prev_styles?.[1], next_styles[1], 'important');
			} else {
				update_styles(dom, prev_styles, next_styles);
			}
		}

		return next_styles;
	}

	/** @import { Blocker, Effect } from '#client' */

	const IS_CUSTOM_ELEMENT = Symbol('is custom element');
	const IS_HTML = Symbol('is html');

	const LINK_TAG = IS_XHTML ? 'link' : 'LINK';

	/**
	 * The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
	 * to remove it upon hydration to avoid a bug when someone resets the form value.
	 * @param {HTMLInputElement} input
	 * @returns {void}
	 */
	function remove_input_defaults(input) {
		if (!hydrating) return;

		var already_removed = false;

		// We try and remove the default attributes later, rather than sync during hydration.
		// Doing it sync during hydration has a negative impact on performance, but deferring the
		// work in an idle task alleviates this greatly. If a form reset event comes in before
		// the idle callback, then we ensure the input defaults are cleared just before.
		var remove_defaults = () => {
			if (already_removed) return;
			already_removed = true;

			// Remove the attributes but preserve the values
			if (input.hasAttribute('value')) {
				var value = input.value;
				set_attribute(input, 'value', null);
				input.value = value;
			}

			if (input.hasAttribute('checked')) {
				var checked = input.checked;
				set_attribute(input, 'checked', null);
				input.checked = checked;
			}
		};

		// @ts-expect-error
		input.__on_r = remove_defaults;
		queue_micro_task(remove_defaults);
		add_form_reset_listener();
	}

	/**
	 * @param {Element} element
	 * @param {string} attribute
	 * @param {string | null} value
	 * @param {boolean} [skip_warning]
	 */
	function set_attribute(element, attribute, value, skip_warning) {
		var attributes = get_attributes(element);

		if (hydrating) {
			attributes[attribute] = element.getAttribute(attribute);

			if (
				attribute === 'src' ||
				attribute === 'srcset' ||
				(attribute === 'href' && element.nodeName === LINK_TAG)
			) {

				// If we reset these attributes, they would result in another network request, which we want to avoid.
				// We assume they are the same between client and server as checking if they are equal is expensive
				// (we can't just compare the strings as they can be different between client and server but result in the
				// same url, so we would need to create hidden anchor elements to compare them)
				return;
			}
		}

		if (attributes[attribute] === (attributes[attribute] = value)) return;

		if (attribute === 'loading') {
			// @ts-expect-error
			element[LOADING_ATTR_SYMBOL] = value;
		}

		if (value == null) {
			element.removeAttribute(attribute);
		} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
			// @ts-ignore
			element[attribute] = value;
		} else {
			element.setAttribute(attribute, value);
		}
	}

	/**
	 *
	 * @param {Element} element
	 */
	function get_attributes(element) {
		return /** @type {Record<string | symbol, unknown>} **/ (
			// @ts-expect-error
			element.__attributes ??= {
				[IS_CUSTOM_ELEMENT]: element.nodeName.includes('-'),
				[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
			}
		);
	}

	/** @type {Map<string, string[]>} */
	var setters_cache = new Map();

	/** @param {Element} element */
	function get_setters(element) {
		var cache_key = element.getAttribute('is') || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, (setters = []));

		var descriptors;
		var proto = element; // In the case of custom elements there might be setters on the instance
		var element_proto = Element.prototype;

		// Stop at Element, from there on there's only unnecessary setters we're not interested in
		// Do not use contructor.name here as that's unreliable in some browser environments
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);

			for (var key in descriptors) {
				if (descriptors[key].set) {
					setters.push(key);
				}
			}

			proto = get_prototype_of(proto);
		}

		return setters;
	}

	/** @import { Batch } from '../../../reactivity/batch.js' */

	/**
	 * @param {HTMLInputElement} input
	 * @param {() => unknown} get
	 * @param {(value: unknown) => void} set
	 * @returns {void}
	 */
	function bind_value(input, get, set = get) {
		var batches = new WeakSet();

		listen_to_event_and_reset_event(input, 'input', async (is_reset) => {

			/** @type {any} */
			var value = is_reset ? input.defaultValue : input.value;
			value = is_numberlike_input(input) ? to_number(value) : value;
			set(value);

			if (current_batch !== null) {
				batches.add(current_batch);
			}

			// Because `{#each ...}` blocks work by updating sources inside the flush,
			// we need to wait a tick before checking to see if we should forcibly
			// update the input and reset the selection state
			await tick();

			// Respect any validation in accessors
			if (value !== (value = get())) {
				var start = input.selectionStart;
				var end = input.selectionEnd;
				var length = input.value.length;

				// the value is coerced on assignment
				input.value = value ?? '';

				// Restore selection
				if (end !== null) {
					var new_length = input.value.length;
					// If cursor was at end and new input is longer, move cursor to new end
					if (start === end && end === length && new_length > length) {
						input.selectionStart = new_length;
						input.selectionEnd = new_length;
					} else {
						input.selectionStart = start;
						input.selectionEnd = Math.min(end, new_length);
					}
				}
			}
		});

		if (
			// If we are hydrating and the value has since changed,
			// then use the updated value from the input instead.
			(hydrating && input.defaultValue !== input.value) ||
			// If defaultValue is set, then value == defaultValue
			// TODO Svelte 6: remove input.value check and set to empty string?
			(untrack(get) == null && input.value)
		) {
			set(is_numberlike_input(input) ? to_number(input.value) : input.value);

			if (current_batch !== null) {
				batches.add(current_batch);
			}
		}

		render_effect(() => {

			var value = get();

			if (input === document.activeElement) {
				// we need both, because in non-async mode, render effects run before previous_batch is set
				var batch = /** @type {Batch} */ (previous_batch ?? current_batch);

				// Never rewrite the contents of a focused input. We can get here if, for example,
				// an update is deferred because of async work depending on the input:
				//
				// <input bind:value={query}>
				// <p>{await find(query)}</p>
				if (batches.has(batch)) {
					return;
				}
			}

			if (is_numberlike_input(input) && value === to_number(input.value)) {
				// handles 0 vs 00 case (see https://github.com/sveltejs/svelte/issues/9959)
				return;
			}

			if (input.type === 'date' && !value && !input.value) {
				// Handles the case where a temporarily invalid date is set (while typing, for example with a leading 0 for the day)
				// and prevents this state from clearing the other parts of the date input (see https://github.com/sveltejs/svelte/issues/7897)
				return;
			}

			// don't set the value of the input if it's the same to allow
			// minlength to work properly
			if (value !== input.value) {
				// @ts-expect-error the value is coerced on assignment
				input.value = value ?? '';
			}
		});
	}

	/**
	 * @param {HTMLInputElement} input
	 */
	function is_numberlike_input(input) {
		var type = input.type;
		return type === 'number' || type === 'range';
	}

	/**
	 * @param {string} value
	 */
	function to_number(value) {
		return value === '' ? null : +value;
	}

	/**
	 * We create one listener for all elements
	 * @see {@link https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ Explanation}
	 */
	class ResizeObserverSingleton {
		/** */
		#listeners = new WeakMap();

		/** @type {ResizeObserver | undefined} */
		#observer;

		/** @type {ResizeObserverOptions} */
		#options;

		/** @static */
		static entries = new WeakMap();

		/** @param {ResizeObserverOptions} options */
		constructor(options) {
			this.#options = options;
		}

		/**
		 * @param {Element} element
		 * @param {(entry: ResizeObserverEntry) => any} listener
		 */
		observe(element, listener) {
			var listeners = this.#listeners.get(element) || new Set();
			listeners.add(listener);

			this.#listeners.set(element, listeners);
			this.#getObserver().observe(element, this.#options);

			return () => {
				var listeners = this.#listeners.get(element);
				listeners.delete(listener);

				if (listeners.size === 0) {
					this.#listeners.delete(element);
					/** @type {ResizeObserver} */ (this.#observer).unobserve(element);
				}
			};
		}

		#getObserver() {
			return (
				this.#observer ??
				(this.#observer = new ResizeObserver(
					/** @param {any} entries */ (entries) => {
						for (var entry of entries) {
							ResizeObserverSingleton.entries.set(entry.target, entry);
							for (var listener of this.#listeners.get(entry.target) || []) {
								listener(entry);
							}
						}
					}
				))
			);
		}
	}

	var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({
		box: 'border-box'
	});

	/**
	 * @param {HTMLElement} element
	 * @param {'clientWidth' | 'clientHeight' | 'offsetWidth' | 'offsetHeight'} type
	 * @param {(size: number) => void} set
	 */
	function bind_element_size(element, type, set) {
		var unsub = resize_observer_border_box.observe(element, () => set(element[type]));

		effect(() => {
			// The update could contain reads which should be ignored
			untrack(() => set(element[type]));
			return unsub;
		});
	}

	/**
	 * @param {any} bound_value
	 * @param {Element} element_or_component
	 * @returns {boolean}
	 */
	function is_bound_this(bound_value, element_or_component) {
		return (
			bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component
		);
	}

	/**
	 * @param {any} element_or_component
	 * @param {(value: unknown, ...parts: unknown[]) => void} update
	 * @param {(...parts: unknown[]) => unknown} get_value
	 * @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
	 * 										returns all the parts of the each block context that are used in the expression
	 * @returns {void}
	 */
	function bind_this(element_or_component = {}, update, get_value, get_parts) {
		effect(() => {
			/** @type {unknown[]} */
			var old_parts;

			/** @type {unknown[]} */
			var parts;

			render_effect(() => {
				old_parts = parts;
				// We only track changes to the parts, not the value itself to avoid unnecessary reruns.
				parts = [];

				untrack(() => {
					if (element_or_component !== get_value(...parts)) {
						update(element_or_component, ...parts);
						// If this is an effect rerun (cause: each block context changes), then nullify the binding at
						// the previous position if it isn't already taken over by a different effect.
						if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
							update(null, ...old_parts);
						}
					}
				});
			});

			return () => {
				// We cannot use effects in the teardown phase, we we use a microtask instead.
				queue_micro_task(() => {
					if (parts && is_bound_this(get_value(...parts), element_or_component)) {
						update(null, ...parts);
					}
				});
			};
		});

		return element_or_component;
	}

	/**
	 * Substitute for the `preventDefault` event modifier
	 * @deprecated
	 * @param {(event: Event, ...args: Array<unknown>) => void} fn
	 * @returns {(event: Event, ...args: unknown[]) => void}
	 */
	function preventDefault(fn) {
		return function (...args) {
			var event = /** @type {Event} */ (args[0]);
			event.preventDefault();
			// @ts-ignore
			return fn?.apply(this, args);
		};
	}

	/** @import { ComponentContextLegacy } from '#client' */

	/**
	 * Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
	 * @param {boolean} [immutable]
	 */
	function init(immutable = false) {
		const context = /** @type {ComponentContextLegacy} */ (component_context);

		const callbacks = context.l.u;
		if (!callbacks) return;

		let props = () => deep_read_state(context.s);

		if (immutable) {
			let version = 0;
			let prev = /** @type {Record<string, any>} */ ({});

			// In legacy immutable mode, before/afterUpdate only fire if the object identity of a prop changes
			const d = derived(() => {
				let changed = false;
				const props = context.s;
				for (const key in props) {
					if (props[key] !== prev[key]) {
						prev[key] = props[key];
						changed = true;
					}
				}
				if (changed) version++;
				return version;
			});

			props = () => get(d);
		}

		// beforeUpdate
		if (callbacks.b.length) {
			user_pre_effect(() => {
				observe_all(context, props);
				run_all(callbacks.b);
			});
		}

		// onMount (must run before afterUpdate)
		user_effect(() => {
			const fns = untrack(() => callbacks.m.map(run));
			return () => {
				for (const fn of fns) {
					if (typeof fn === 'function') {
						fn();
					}
				}
			};
		});

		// afterUpdate
		if (callbacks.a.length) {
			user_effect(() => {
				observe_all(context, props);
				run_all(callbacks.a);
			});
		}
	}

	/**
	 * Invoke the getter of all signals associated with a component
	 * so they can be registered to the effect this function is called in.
	 * @param {ComponentContextLegacy} context
	 * @param {(() => void)} props
	 */
	function observe_all(context, props) {
		if (context.l.s) {
			for (const signal of context.l.s) get(signal);
		}

		props();
	}

	/**
	 * @this {any}
	 * @param {Record<string, unknown>} $$props
	 * @param {Event} event
	 * @returns {void}
	 */
	function bubble_event($$props, event) {
		var events = /** @type {Record<string, Function[] | Function>} */ ($$props.$$events)?.[
			event.type
		];

		var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];

		for (var fn of callbacks) {
			// Preserve "this" context
			fn.call(this, event);
		}
	}

	/** @import { StoreReferencesContainer } from '#client' */
	/** @import { Store } from '#shared' */

	/**
	 * Whether or not the prop currently being read is a store binding, as in
	 * `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
	 * runes mode, and skip `binding_property_non_reactive` validation
	 */
	let is_store_binding = false;

	/**
	 * Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
	 * Used to prevent `binding_property_non_reactive` validation false positives and
	 * ensure that these props are treated as mutable even in runes mode
	 * @template T
	 * @param {() => T} fn
	 * @returns {[T, boolean]}
	 */
	function capture_store_binding(fn) {
		var previous_is_store_binding = is_store_binding;

		try {
			is_store_binding = false;
			return [fn(), is_store_binding];
		} finally {
			is_store_binding = previous_is_store_binding;
		}
	}

	/** @import { Effect, Source } from './types.js' */

	/**
	 * This function is responsible for synchronizing a possibly bound prop with the inner component state.
	 * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
	 * @template V
	 * @param {Record<string, unknown>} props
	 * @param {string} key
	 * @param {number} flags
	 * @param {V | (() => V)} [fallback]
	 * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
	 */
	function prop(props, key, flags, fallback) {
		var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
		var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
		var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;

		var fallback_value = /** @type {V} */ (fallback);
		var fallback_dirty = true;

		var get_fallback = () => {
			if (fallback_dirty) {
				fallback_dirty = false;

				fallback_value = lazy
					? untrack(/** @type {() => V} */ (fallback))
					: /** @type {V} */ (fallback);
			}

			return fallback_value;
		};

		/** @type {((v: V) => void) | undefined} */
		var setter;

		if (bindable) {
			// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
			// or `createClassComponent(Component, props)`
			var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;

			setter =
				get_descriptor(props, key)?.set ??
				(is_entry_props && key in props ? (v) => (props[key] = v) : undefined);
		}

		var initial_value;
		var is_store_sub = false;

		if (bindable) {
			[initial_value, is_store_sub] = capture_store_binding(() => /** @type {V} */ (props[key]));
		} else {
			initial_value = /** @type {V} */ (props[key]);
		}

		if (initial_value === undefined && fallback !== undefined) {
			initial_value = get_fallback();

			if (setter) {
				if (runes) props_invalid_value();
				setter(initial_value);
			}
		}

		/** @type {() => V} */
		var getter;

		if (runes) {
			getter = () => {
				var value = /** @type {V} */ (props[key]);
				if (value === undefined) return get_fallback();
				fallback_dirty = true;
				return value;
			};
		} else {
			getter = () => {
				var value = /** @type {V} */ (props[key]);

				if (value !== undefined) {
					// in legacy mode, we don't revert to the fallback value
					// if the prop goes from defined to undefined. The easiest
					// way to model this is to make the fallback undefined
					// as soon as the prop has a value
					fallback_value = /** @type {V} */ (undefined);
				}

				return value === undefined ? fallback_value : value;
			};
		}

		// prop is never written to — we only need a getter
		if (runes && (flags & PROPS_IS_UPDATED) === 0) {
			return getter;
		}

		// prop is written to, but the parent component had `bind:foo` which
		// means we can just call `$$props.foo = value` directly
		if (setter) {
			var legacy_parent = props.$$legacy;
			return /** @type {() => V} */ (
				function (/** @type {V} */ value, /** @type {boolean} */ mutation) {
					if (arguments.length > 0) {
						// We don't want to notify if the value was mutated and the parent is in runes mode.
						// In that case the state proxy (if it exists) should take care of the notification.
						// If the parent is not in runes mode, we need to notify on mutation, too, that the prop
						// has changed because the parent will not be able to detect the change otherwise.
						if (!runes || !mutation || legacy_parent || is_store_sub) {
							/** @type {Function} */ (setter)(mutation ? getter() : value);
						}

						return value;
					}

					return getter();
				}
			);
		}

		// Either prop is written to, but there's no binding, which means we
		// create a derived that we can write to locally.
		// Or we are in legacy mode where we always create a derived to replicate that
		// Svelte 4 did not trigger updates when a primitive value was updated to the same value.
		var overridden = false;

		var d = ((flags & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
			overridden = false;
			return getter();
		});

		// Capture the initial value if it's bindable
		if (bindable) get(d);

		var parent_effect = /** @type {Effect} */ (active_effect);

		return /** @type {() => V} */ (
			function (/** @type {any} */ value, /** @type {boolean} */ mutation) {
				if (arguments.length > 0) {
					const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;

					set(d, new_value);
					overridden = true;

					if (fallback_value !== undefined) {
						fallback_value = new_value;
					}

					return value;
				}

				// special case — avoid recalculating the derived if we're in a
				// teardown function and the prop was overridden locally, or the
				// component was already destroyed (this latter part is necessary
				// because `bind:this` can read props after the component has
				// been destroyed. TODO simplify `bind:this`
				if ((is_destroying_effect && overridden) || (parent_effect.f & DESTROYED) !== 0) {
					return d.v;
				}

				return get(d);
			}
		);
	}

	/** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */

	/**
	 * Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
	 *
	 * @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
	 *
	 * @template {Record<string, any>} Props
	 * @template {Record<string, any>} Exports
	 * @template {Record<string, any>} Events
	 * @template {Record<string, any>} Slots
	 *
	 * @param {ComponentConstructorOptions<Props> & {
	 * 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
	 * }} options
	 * @returns {SvelteComponent<Props, Events, Slots> & Exports}
	 */
	function createClassComponent(options) {
		// @ts-expect-error $$prop_def etc are not actually defined
		return new Svelte4Component(options);
	}

	/**
	 * Support using the component as both a class and function during the transition period
	 * @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
	 */

	class Svelte4Component {
		/** @type {any} */
		#events;

		/** @type {Record<string, any>} */
		#instance;

		/**
		 * @param {ComponentConstructorOptions & {
		 *  component: any;
		 * }} options
		 */
		constructor(options) {
			var sources = new Map();

			/**
			 * @param {string | symbol} key
			 * @param {unknown} value
			 */
			var add_source = (key, value) => {
				var s = mutable_source(value, false, false);
				sources.set(key, s);
				return s;
			};

			// Replicate coarse-grained props through a proxy that has a version source for
			// each property, which is incremented on updates to the property itself. Do not
			// use our $state proxy because that one has fine-grained reactivity.
			const props = new Proxy(
				{ ...(options.props || {}), $$events: {} },
				{
					get(target, prop) {
						return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
					},
					has(target, prop) {
						// Necessary to not throw "invalid binding" validation errors on the component side
						if (prop === LEGACY_PROPS) return true;

						get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
						return Reflect.has(target, prop);
					},
					set(target, prop, value) {
						set(sources.get(prop) ?? add_source(prop, value), value);
						return Reflect.set(target, prop, value);
					}
				}
			);

			this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
				target: options.target,
				anchor: options.anchor,
				props,
				context: options.context,
				intro: options.intro ?? false,
				recover: options.recover,
				transformError: options.transformError
			});

			// We don't flushSync for custom element wrappers or if the user doesn't want it,
			// or if we're in async mode since `flushSync()` will fail
			if ((!options?.props?.$$host || options.sync === false)) {
				flushSync();
			}

			this.#events = props.$$events;

			for (const key of Object.keys(this.#instance)) {
				if (key === '$set' || key === '$destroy' || key === '$on') continue;
				define_property(this, key, {
					get() {
						return this.#instance[key];
					},
					/** @param {any} value */
					set(value) {
						this.#instance[key] = value;
					},
					enumerable: true
				});
			}

			this.#instance.$set = /** @param {Record<string, any>} next */ (next) => {
				Object.assign(props, next);
			};

			this.#instance.$destroy = () => {
				unmount(this.#instance);
			};
		}

		/** @param {Record<string, any>} props */
		$set(props) {
			this.#instance.$set(props);
		}

		/**
		 * @param {string} event
		 * @param {(...args: any[]) => any} callback
		 * @returns {any}
		 */
		$on(event, callback) {
			this.#events[event] = this.#events[event] || [];

			/** @param {any[]} args */
			const cb = (...args) => callback.call(this, ...args);
			this.#events[event].push(cb);
			return () => {
				this.#events[event] = this.#events[event].filter(/** @param {any} fn */ (fn) => fn !== cb);
			};
		}

		$destroy() {
			this.#instance.$destroy();
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	/** @type {any} */
	let SvelteElement;

	if (typeof HTMLElement === 'function') {
		SvelteElement = class extends HTMLElement {
			/** The Svelte component constructor */
			$$ctor;
			/** Slots */
			$$s;
			/** @type {any} The Svelte component instance */
			$$c;
			/** Whether or not the custom element is connected */
			$$cn = false;
			/** @type {Record<string, any>} Component props data */
			$$d = {};
			/** `true` if currently in the process of reflecting component props back to attributes */
			$$r = false;
			/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
			$$p_d = {};
			/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
			$$l = {};
			/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
			$$l_u = new Map();
			/** @type {any} The managed render effect for reflecting attributes */
			$$me;
			/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
			$$shadowRoot = null;

			/**
			 * @param {*} $$componentCtor
			 * @param {*} $$slots
			 * @param {ShadowRootInit | undefined} shadow_root_init
			 */
			constructor($$componentCtor, $$slots, shadow_root_init) {
				super();
				this.$$ctor = $$componentCtor;
				this.$$s = $$slots;

				if (shadow_root_init) {
					// We need to store the reference to shadow root, because `closed` shadow root cannot be
					// accessed with `this.shadowRoot`.
					this.$$shadowRoot = this.attachShadow(shadow_root_init);
				}
			}

			/**
			 * @param {string} type
			 * @param {EventListenerOrEventListenerObject} listener
			 * @param {boolean | AddEventListenerOptions} [options]
			 */
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

			/**
			 * @param {string} type
			 * @param {EventListenerOrEventListenerObject} listener
			 * @param {boolean | AddEventListenerOptions} [options]
			 */
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
					/** @param {string} name */
					function create_slot(name) {
						/**
						 * @param {Element} anchor
						 */
						return (anchor) => {
							const slot = create_element('slot');
							if (name !== 'default') slot.name = name;

							append(anchor, slot);
						};
					}
					/** @type {Record<string, any>} */
					const $$slots = {};
					const existing_slots = get_custom_elements_slots(this);
					for (const name of this.$$s) {
						if (name in existing_slots) {
							if (name === 'default' && !this.$$d.children) {
								this.$$d.children = create_slot(name);
								$$slots.default = true;
							} else {
								$$slots[name] = create_slot(name);
							}
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
						// @ts-expect-error
						if (!(key in this.$$d) && this[key] !== undefined) {
							// @ts-expect-error
							this.$$d[key] = this[key]; // don't transform, these were set through JavaScript
							// @ts-expect-error
							delete this[key]; // remove the property that shadows the getter/setter
						}
					}
					this.$$c = createClassComponent({
						component: this.$$ctor,
						target: this.$$shadowRoot || this,
						props: {
							...this.$$d,
							$$slots,
							$$host: this
						}
					});

					// Reflect component props as attributes
					this.$$me = effect_root(() => {
						render_effect(() => {
							this.$$r = true;
							for (const key of object_keys(this.$$c)) {
								if (!this.$$p_d[key]?.reflect) continue;
								this.$$d[key] = this.$$c[key];
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
							this.$$r = false;
						});
					});

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

			/**
			 * @param {string} attr
			 * @param {string} _oldValue
			 * @param {string} newValue
			 */
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
					if (!this.$$cn && this.$$c) {
						this.$$c.$destroy();
						this.$$me();
						this.$$c = undefined;
					}
				});
			}

			/**
			 * @param {string} attribute_name
			 */
			$$g_p(attribute_name) {
				return (
					object_keys(this.$$p_d).find(
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
	 * @param {HTMLElement} element
	 */
	function get_custom_elements_slots(element) {
		/** @type {Record<string, true>} */
		const result = {};
		element.childNodes.forEach((node) => {
			result[/** @type {Element} node */ (node).slot || 'default'] = true;
		});
		return result;
	}

	/**
	 * @internal
	 *
	 * Turn a Svelte component into a custom element.
	 * @param {any} Component  A Svelte component function
	 * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
	 * @param {string[]} slots  The slots to create
	 * @param {string[]} exports  Explicitly exported values, other than props
	 * @param {ShadowRootInit | undefined} shadow_root_init  Options passed to shadow DOM constructor
	 * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
	 */
	function create_custom_element(
		Component,
		props_definition,
		slots,
		exports$1,
		shadow_root_init,
		extend
	) {
		let Class = class extends SvelteElement {
			constructor() {
				super(Component, slots, shadow_root_init);
				this.$$p_d = props_definition;
			}
			static get observedAttributes() {
				return object_keys(props_definition).map((key) =>
					(props_definition[key].attribute || key).toLowerCase()
				);
			}
		};
		object_keys(props_definition).forEach((prop) => {
			define_property(Class.prototype, prop, {
				get() {
					return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
				},
				set(value) {
					value = get_custom_element_value(prop, value, props_definition);
					this.$$d[prop] = value;
					var component = this.$$c;

					if (component) {
						// // If the instance has an accessor, use that instead
						var setter = get_descriptor(component, prop)?.get;

						if (setter) {
							component[prop] = value;
						} else {
							component.$set({ [prop]: value });
						}
					}
				}
			});
		});
		exports$1.forEach((property) => {
			define_property(Class.prototype, property, {
				get() {
					return this.$$c?.[property];
				}
			});
		});
		Component.element = /** @type {any} */ Class;
		return Class;
	}

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

	var root_1$1 = from_html(`<div><!> <!> <!></div>`);

	const $$css$3 = {
		hash: 'svelte-k1cdrk',
		code: '.color-picker.svelte-k1cdrk {position:absolute;top:100%;left:0px;display:flex;border:1px solid hsla(222, 14%, 47%, 0.3);background-color:inherit;border-radius:5px;box-sizing:border-box;padding:12px;width:100%;height:210px;z-index:50;}.color-picker.above.svelte-k1cdrk {top:auto;bottom:100%;}.color-picker.hidden.svelte-k1cdrk {display:none;}.color-picker.svelte-k1cdrk .slider {margin-left:12px;}'
	};

	function ColorPicker($$anchor, $$props) {
		push($$props, false);
		append_styles$1($$anchor, $$css$3);

		let color = prop($$props, 'color', 12);
		let isOpen = prop($$props, 'isOpen', 12, false);
		let showAlphaSlider = prop($$props, 'showAlphaSlider', 12, false);
		let position = prop($$props, 'position', 28, () => Position.Auto);

		/** Element used to figure out position (probably an input element) */
		let positioningContextElement = prop($$props, 'positioningContextElement', 12);

		let pickerEl = mutable_source();

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		let showAbove = mutable_source(false);

		legacy_pre_effect(() => (deep_read_state(color()), deep_read_state(onInput())), () => {
			if (color()) onInput()();
		});

		legacy_pre_effect(
			() => (
				get(pickerEl),
				deep_read_state(positioningContextElement()),
				shouldShowAbove
			),
			() => {
				if (get(pickerEl) && positioningContextElement()) {
					set(showAbove, shouldShowAbove(get(pickerEl), positioningContextElement()));
				}
			}
		);

		legacy_pre_effect_reset();

		var $$exports = {
			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get isOpen() {
				return isOpen();
			},

			set isOpen($$value) {
				isOpen($$value);
				flushSync();
			},

			get showAlphaSlider() {
				return showAlphaSlider();
			},

			set showAlphaSlider($$value) {
				showAlphaSlider($$value);
				flushSync();
			},

			get position() {
				return position();
			},

			set position($$value) {
				position($$value);
				flushSync();
			},

			get positioningContextElement() {
				return positioningContextElement();
			},

			set positioningContextElement($$value) {
				positioningContextElement($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			}
		};

		init();

		var fragment = comment();
		var node = first_child(fragment);

		{
			var consequent_1 = ($$anchor) => {
				var div = root_1$1();
				let classes;
				var node_1 = child(div);

				ColorArea(node_1, {
					get onInput() {
						return onInput();
					},

					get color() {
						return color();
					},

					set color($$value) {
						color($$value);
					},
					$$legacy: true
				});

				var node_2 = sibling(node_1, 2);

				HueSlider(node_2, {
					get onInput() {
						return onInput();
					},

					get color() {
						return color();
					},

					set color($$value) {
						color($$value);
					},
					$$legacy: true
				});

				var node_3 = sibling(node_2, 2);

				{
					var consequent = ($$anchor) => {
						AlphaSlider($$anchor, {
							get onInput() {
								return onInput();
							},

							get color() {
								return color();
							},

							set color($$value) {
								color($$value);
							},
							$$legacy: true
						});
					};

					if_block(node_3, ($$render) => {
						if (showAlphaSlider()) $$render(consequent);
					});
				}

				reset(div);
				bind_this(div, ($$value) => set(pickerEl, $$value), () => get(pickerEl));

				template_effect(() => classes = set_class(div, 1, 'color-picker svelte-k1cdrk', null, classes, {
					above: position() === Position.Auto ? get(showAbove) : position() === Position.Above,
					hidden: !isOpen()
				}));

				event$1('touchstart', div, preventDefault(function ($$arg) {
					bubble_event.call(this, $$props, $$arg);
				}));

				append($$anchor, div);
			};

			if_block(node, ($$render) => {
				if (isOpen()) $$render(consequent_1);
			});
		}

		append($$anchor, fragment);

		return pop($$exports);
	}

	create_custom_element(
		ColorPicker,
		{
			color: {},
			isOpen: {},
			showAlphaSlider: {},
			position: {},
			positioningContextElement: {},
			onInput: {}
		},
		[],
		[],
		{ mode: 'open' }
	);

	var root$2 = from_html(`<div role="button" aria-label="Open color picker"><div class="color-frame svelte-7gb28q"><div class="color-frame-color svelte-7gb28q"></div></div> <div class="text svelte-7gb28q"><input type="text"/> <span> </span></div> <!></div>`);

	const $$css$2 = {
		hash: 'svelte-7gb28q',
		code: '.input.svelte-7gb28q {width:var(--input-width, 100%);display:flex;justify-items:center;align-items:center;box-sizing:border-box;border-radius:4px;padding:0px 10px;background:var(--picker-background, #ffffff);border:1px solid hsla(222, 14%, 47%, 0.3);box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.05);position:relative;user-select:none;outline:none;cursor:default;}.input.disabled.svelte-7gb28q {opacity:0.5;}.input.svelte-7gb28q:focus-within {border-color:#0269f7;box-shadow:0px 0px 0px 3px rgba(2, 105, 247, 0.4);}.text.svelte-7gb28q {position:relative;}.title.svelte-7gb28q {position:absolute;top:0px;left:0px;width:100%;pointer-events:none;display:none;}.title.show.svelte-7gb28q {display:block;}.color-frame.svelte-7gb28q {pointer-events:none;height:20px;margin:8px 0px;margin-right:11px;width:38px;flex-shrink:0;border-radius:4px;box-sizing:border-box;box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.05);background-image:repeating-conic-gradient(#cccccc 0 25%, #ffffff 0 50%);background-size:0.5rem 0.5rem;background-position:0 0, 0.25rem 0.25rem;}.color-frame.svelte-7gb28q .color-frame-color:where(.svelte-7gb28q) {width:100%;height:100%;box-sizing:border-box;border-radius:inherit;border:1px solid hsla(0, 0%, 100%, 0.3);}input.svelte-7gb28q {color:inherit;font-family:inherit;font-size:inherit;background-color:transparent;width:100%;outline:none;border:none;padding:0px;margin:0px;opacity:0;cursor:inherit;line-height:normal;}input.svelte-7gb28q:focus {box-shadow:none;}input.show.svelte-7gb28q {opacity:1;cursor:text;}'
	};

	function ColorInput($$anchor, $$props) {
		push($$props, false);
		append_styles$1($$anchor, $$css$2);

		let color = prop($$props, 'color', 12);
		let title = prop($$props, 'title', 12, 'Color');
		let isOpen = prop($$props, 'isOpen', 12, false);
		let showAlphaSlider = prop($$props, 'showAlphaSlider', 12, false);
		let disabled = prop($$props, 'disabled', 12, false);

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		let onClose = prop($$props, 'onClose', 12, () => {
			/* noop */
		});

		let skipCloseEvent = mutable_source(!isOpen());
		let classes = prop($$props, 'class', 12, '');

		function update(color) {
			if (color.h !== lastColor.h || color.s !== lastColor.s || color.v !== lastColor.v || color.a !== lastColor.a) {
				set(text, color.a === 1 ? color.toHexString() : color.toHex8String());
				lastColor = new Color(color);
			}
		}

		let text = mutable_source(color().a === 1 ? color().toHexString() : color().toHex8String());
		let lastColor = new Color(color());

		function textInputHandler() {
			const tinyColor = new TinyColor(get(text));

			if (tinyColor.isValid) {
				color(new Color(tinyColor.toHsv()));
				lastColor = color();
			}

			onInput()();
		}

		let parent = mutable_source();

		function focusout(e) {
			if (e.relatedTarget === null) {
				isOpen(false);
			} else if (e.relatedTarget instanceof HTMLElement) {
				const stayingInParent = get(parent).contains(e.relatedTarget);

				if (!stayingInParent) {
					isOpen(false);
				}
			}
		}

		function keydown(e) {
			if (checkShortcut(e, 'Escape')) {
				isOpen(false);
			} else if (checkShortcut(e, 'Enter')) {
				open();
			}
		}

		let inputElement = mutable_source();
		let position = prop($$props, 'position', 28, () => Position.Auto);

		function open() {
			if (!isOpen() && !disabled()) {
				isOpen(true);
				get(inputElement).focus();
				get(inputElement).select();

				return true;
			}
		}

		function openAndPreventDefault(e) {
			if (open()) {
				e.preventDefault();
			}
		}

		function init$1(el) {
			if (document.activeElement === el) {
				isOpen(true);
			}
		}

		legacy_pre_effect(
			() => (
				deep_read_state(isOpen()),
				get(skipCloseEvent),
				deep_read_state(onClose())
			),
			() => {
				if (!isOpen()) {
					if (!get(skipCloseEvent)) {
						onClose()();
					}

					set(skipCloseEvent, false);
				}
			}
		);

		legacy_pre_effect(() => (deep_read_state(color())), () => {
			update(color());
		});

		legacy_pre_effect_reset();

		var $$exports = {
			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get title() {
				return title();
			},

			set title($$value) {
				title($$value);
				flushSync();
			},

			get isOpen() {
				return isOpen();
			},

			set isOpen($$value) {
				isOpen($$value);
				flushSync();
			},

			get showAlphaSlider() {
				return showAlphaSlider();
			},

			set showAlphaSlider($$value) {
				showAlphaSlider($$value);
				flushSync();
			},

			get disabled() {
				return disabled();
			},

			set disabled($$value) {
				disabled($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			},

			get onClose() {
				return onClose();
			},

			set onClose($$value) {
				onClose($$value);
				flushSync();
			},

			get class() {
				return classes();
			},

			set class($$value) {
				classes($$value);
				flushSync();
			},

			get position() {
				return position();
			},

			set position($$value) {
				position($$value);
				flushSync();
			}
		};

		init();

		var div = root$2();
		let classes_1;
		var div_1 = child(div);
		var div_2 = child(div_1);
		let styles;

		reset(div_1);

		var div_3 = sibling(div_1, 2);
		var input = child(div_3);

		remove_input_defaults(input);

		let classes_2;

		bind_this(input, ($$value) => set(inputElement, $$value), () => get(inputElement));
		effect(() => bind_value(input, () => get(text), ($$value) => set(text, $$value)));
		effect(() => event$1('input', input, textInputHandler));
		effect(() => event$1('focus', input, open));
		action(input, ($$node) => init$1?.($$node));

		var span = sibling(input, 2);
		let classes_3;
		var text_1 = child(span, true);

		reset(span);
		reset(div_3);

		var node = sibling(div_3, 2);

		slot(
			node,
			$$props,
			'default',
			{
				get isOpen() {
					return isOpen();
				}
			},
			($$anchor) => {
				ColorPicker($$anchor, {
					get positioningContextElement() {
						return get(inputElement);
					},

					get onInput() {
						return onInput();
					},

					get isOpen() {
						return isOpen();
					},

					get position() {
						return position();
					},

					get showAlphaSlider() {
						return showAlphaSlider();
					},

					get color() {
						return color();
					},

					set color($$value) {
						color($$value);
					},
					$$legacy: true
				});
			}
		);

		reset(div);
		bind_this(div, ($$value) => set(parent, $$value), () => get(parent));

		template_effect(
			($0) => {
				classes_1 = set_class(div, 1, `input ${classes() ?? ''}`, 'svelte-7gb28q', classes_1, { disabled: disabled() });
				set_attribute(div, 'tabindex', disabled() ? null : -1);
				styles = set_style(div_2, '', styles, $0);
				input.disabled = disabled();
				classes_2 = set_class(input, 1, 'svelte-7gb28q', null, classes_2, { show: isOpen() });
				classes_3 = set_class(span, 1, 'title svelte-7gb28q', null, classes_3, { show: !isOpen() });
				set_text(text_1, title());
			},
			[
				() => ({
					'background-color': (
						deep_read_state(color()),
						untrack(() => color().toHex8String())
					)
				})
			]
		);

		event$1('mousedown', div, openAndPreventDefault);
		event$1('keydown', div, keydown);
		event$1('focusout', div, focusout);
		append($$anchor, div);

		return pop($$exports);
	}

	create_custom_element(
		ColorInput,
		{
			color: {},
			title: {},
			isOpen: {},
			showAlphaSlider: {},
			disabled: {},
			onInput: {},
			onClose: {},
			class: {},
			position: {}
		},
		['default'],
		[],
		{ mode: 'open' }
	);

	function HueSlider$1($$anchor, $$props) {
		push($$props, false);

		let color = prop($$props, 'color', 12);

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		var $$exports = {
			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			}
		};

		init();

		Slider($$anchor, {
			get color() {
				return color();
			},
			max: 360,
			get handleColor() {
				return `hsl(${(deep_read_state(color()), untrack(() => color().h)) ?? ''},100%,50%)`;
			},
			style: 'hue',
			get onInput() {
				return onInput();
			},

			get value() {
				return color().h;
			},

			set value($$value) {
				color(color().h = $$value, true);
			},
			$$legacy: true
		});

		return pop($$exports);
	}

	create_custom_element(HueSlider$1, { color: {}, onInput: {} }, [], [], { mode: 'open' });

	function AlphaSlider$1($$anchor, $$props) {
		push($$props, false);

		let color = prop($$props, 'color', 12);

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		var $$exports = {
			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			}
		};

		init();

		{
			let $0 = derived_safe_equal(() => (deep_read_state(color()), untrack(() => color().h)));
			let $1 = derived_safe_equal(() => (deep_read_state(color()), untrack(() => color().s * 100)));
			let $2 = derived_safe_equal(() => (deep_read_state(color()), untrack(() => color().v * 100)));
			let $3 = derived_safe_equal(() => (deep_read_state(color()), untrack(() => color().a)));

			Slider($$anchor, {
				get color() {
					return color();
				},
				max: 1,
				get handleColor() {
					return `hsla(${get($0) ?? ''},${get($1) ?? ''}%,${get($2) ?? ''}%,${get($3) ?? ''})`;
				},
				style: 'alpha',
				get onInput() {
					return onInput();
				},

				get value() {
					return color().a;
				},

				set value($$value) {
					color(color().a = $$value, true);
				},
				$$legacy: true
			});
		}

		return pop($$exports);
	}

	create_custom_element(AlphaSlider$1, { color: {}, onInput: {} }, [], [], { mode: 'open' });

	var root$1 = from_html(`<div class="color-area svelte-tdk7vl"><div class="handle svelte-tdk7vl"></div></div>`);

	const $$css$1 = {
		hash: 'svelte-tdk7vl',
		code: '.color-area.svelte-tdk7vl {width:100%;user-select:none;height:100%;position:relative;border-radius:4px;background:linear-gradient(transparent, #000000), linear-gradient(0.25turn, #ffffff, transparent), var(--hue-color);}.handle.svelte-tdk7vl {width:14px;height:14px;position:absolute;transform:translate(-50%, -50%);border-radius:50%;border:2px solid #ffffff;box-shadow:0px 0px 3px 0px hsla(0, 0%, 0%, 0.5);}'
	};

	function ColorArea$1($$anchor, $$props) {
		push($$props, false);
		append_styles$1($$anchor, $$css$1);

		let color = prop($$props, 'color', 12);
		let clientHeight = prop($$props, 'clientHeight', 12, 0);

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		let hue = mutable_source(color().h);
		let parent = mutable_source();

		function pickPos(clientX, clientY) {
			const rect = get(parent).getBoundingClientRect();
			const x = clientX - rect.left;
			const y = clientY - rect.top;

			color(new Color({
				h: get(hue),
				s: x / rect.width,
				v: 1 - y / rect.height,
				a: color().a
			}));

			onInput()(color());
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

		legacy_pre_effect(() => (deep_read_state(color())), () => {
			set(hue, color().h);
		});

		legacy_pre_effect_reset();

		var $$exports = {
			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get clientHeight() {
				return clientHeight();
			},

			set clientHeight($$value) {
				clientHeight($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			}
		};

		init();

		var div = root$1();

		event$1('mousemove', $window, onMouse);
		event$1('mouseup', $window, mouseUp);
		event$1('touchmove', $window, onTouch);
		event$1('touchend', $window, touchEnd);

		let styles;
		var div_1 = child(div);
		let styles_1;

		reset(div);
		bind_this(div, ($$value) => set(parent, $$value), () => get(parent));

		template_effect(
			($0, $1) => {
				styles = set_style(div, '', styles, $0);
				styles_1 = set_style(div_1, '', styles_1, $1);
			},
			[
				() => ({
					'--hue-color': (
						get(hue),
						untrack(() => `hsl(${Math.round(get(hue))},100%,50%)`)
					)
				}),

				() => ({
					top: (
						deep_read_state(color()),
						untrack(() => (1 - color().v) * 100 + '%')
					),

					left: (
						deep_read_state(color()),
						untrack(() => color().s * 100 + '%')
					),

					'background-color': (
						deep_read_state(color()),
						untrack(() => color().toHexString())
					)
				})
			]
		);

		bind_element_size(div, 'clientHeight', clientHeight);
		event$1('mousedown', div, mouseDown);
		event$1('touchstart', div, preventDefault(touchStart));
		append($$anchor, div);

		return pop($$exports);
	}

	create_custom_element(ColorArea$1, { color: {}, clientHeight: {}, onInput: {} }, [], [], { mode: 'open' });

	var root = from_html(`<div role="slider" tabindex="-1"><div class="slider-track svelte-1ia9vwu"><div class="slider-track-overlay svelte-1ia9vwu"></div></div> <div class="slider-handle svelte-1ia9vwu"></div></div>`);

	const $$css = {
		hash: 'svelte-1ia9vwu',
		code: '.slider.svelte-1ia9vwu {padding:0rem 0.3rem;flex-shrink:0;user-select:none;box-sizing:border-box;position:relative;}.slider-track.svelte-1ia9vwu {height:100%;width:0.5rem;border-radius:4px;}.hue.svelte-1ia9vwu .slider-track:where(.svelte-1ia9vwu) {background:linear-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%));}.alpha.svelte-1ia9vwu .slider-track:where(.svelte-1ia9vwu) {background-image:repeating-conic-gradient(#bfbfbf 0 25%, #ffffff 0 50%);background-size:0.5rem 0.5rem;background-position:0 0, 0.25rem 0.25rem;}.alpha.svelte-1ia9vwu .slider-track-overlay:where(.svelte-1ia9vwu) {width:100%;height:100%;background-image:linear-gradient(to bottom, transparent 0%, var(--color) 100%);border-radius:inherit;}.slider-handle.svelte-1ia9vwu {width:1rem;height:1rem;box-sizing:border-box;border-radius:100px;left:50%;transform:translate(-50%, -50%);position:absolute;border:2px solid #ffffff;box-shadow:0px 0px 3px 0px hsla(0, 0%, 0%, 0.5);}'
	};

	function Slider$1($$anchor, $$props) {
		push($$props, false);
		append_styles$1($$anchor, $$css);

		let value = prop($$props, 'value', 12);
		let max = prop($$props, 'max', 12);
		let color = prop($$props, 'color', 12);
		let handleColor = prop($$props, 'handleColor', 12, undefined);
		let style = prop($$props, 'style', 12);

		let onInput = prop($$props, 'onInput', 12, () => {
			/* noop */
		});

		let parent = mutable_source();

		function pickPos(clientY) {
			const rect = get(parent).getBoundingClientRect();
			const y = clientY - rect.top;
			const percentage = y / rect.height;

			value(clamp(0, max(), percentage * max()));
			onInput()(value());
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

		var $$exports = {
			get value() {
				return value();
			},

			set value($$value) {
				value($$value);
				flushSync();
			},

			get max() {
				return max();
			},

			set max($$value) {
				max($$value);
				flushSync();
			},

			get color() {
				return color();
			},

			set color($$value) {
				color($$value);
				flushSync();
			},

			get handleColor() {
				return handleColor();
			},

			set handleColor($$value) {
				handleColor($$value);
				flushSync();
			},

			get style() {
				return style();
			},

			set style($$value) {
				style($$value);
				flushSync();
			},

			get onInput() {
				return onInput();
			},

			set onInput($$value) {
				onInput($$value);
				flushSync();
			}
		};

		init();

		var div = root();

		event$1('mousemove', $window, onMouse);
		event$1('mouseup', $window, mouseUp);
		event$1('touchmove', $window, onTouch);
		event$1('touchend', $window, touchEnd);

		let classes;
		var div_1 = sibling(child(div), 2);
		let styles;

		reset(div);
		bind_this(div, ($$value) => set(parent, $$value), () => get(parent));

		template_effect(
			($0) => {
				set_attribute(div, 'aria-valuenow', value());
				set_attribute(div, 'aria-valuemax', max());
				classes = set_class(div, 1, 'slider svelte-1ia9vwu', null, classes, { hue: style() === 'hue', alpha: style() === 'alpha' });
				set_style(div, `--color:${$0 ?? ''};`);

				styles = set_style(div_1, '', styles, {
					top: value() / max() * 100 + '%',
					'background-color': handleColor()
				});
			},
			[
				() => (
					deep_read_state(color()),
					untrack(() => color().toHexString())
				)
			]
		);

		event$1('mousedown', div, mouseDown);
		event$1('touchstart', div, preventDefault(touchStart));
		append($$anchor, div);

		return pop($$exports);
	}

	create_custom_element(
		Slider$1,
		{
			value: {},
			max: {},
			color: {},
			handleColor: {},
			style: {},
			onInput: {}
		},
		[],
		[],
		{ mode: 'open' }
	);

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

	var root_4 = from_html(`<span> </span>`);
	var root_3 = from_html(`<div class="p-2 to-top-section"><button class="arrow-up-icon btn btn-default  t3js-editform-delete-record moveDomainColor"><!></button></div>`);
	var root_6 = from_html(`<span> </span>`);
	var root_5 = from_html(`<div class="p-2 to-down-section"><button class="arrow-down-icon btn btn-default  t3js-editform-delete-record moveDomainColor"><!></button></div>`);
	var root_7 = from_html(`<span> </span>`);
	var root_2 = from_html(`<div class="d-flex align-items-start flex-column mb-3"><div class="mb-0"><div class="d-flex"><div class="form-control-wrap input-element"><div class="form-wizards-wrap"><div class="form-wizards-element pr-2"><input type="text"/></div></div></div> <div class="t3js-formengine-validation-marker"><div class="formengine-field-item t3js-formengine-field-item"><div class="form-control-wrap input-element color-picker"><div class="form-wizards-wrap"><div class="form-wizards-element"><!></div></div></div></div></div> <!> <!> <div><button class="delete-icon btn btn-default  t3js-editform-delete-record"><!></button></div></div></div> <div class="error-message-section"><span class="error-message"> </span></div></div>`);

	var root_1 = from_html(
		`<style lang="scss">.arrow-down-icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTcgMnY3LjNINWMtLjQgMC0uNi41LS40LjhsMyAzLjdjLjIuMi42LjIuOCAwbDMtMy43Yy4yLS4zIDAtLjgtLjQtLjhIOVYySDd6Ii8+PC9nPjwvc3ZnPg0K");
}

.arrow-up-icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNOSAxNFY2LjdoMmMuNCAwIC42LS41LjQtLjhsLTMtMy43Yy0uMi0uMi0uNi0uMi0uOCAwbC0zIDMuN2MtLjIuMyAwIC44LjQuOGgyVjE0aDJ6Ii8+PC9nPjwvc3ZnPg0K");
}

.delete-icon {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNyA1SDZ2OGgxek0xMCA1SDl2OGgxeiIvPjxwYXRoIGQ9Ik0xMyAzaC0ydi0uNzVDMTEgMS41NiAxMC40NCAxIDkuNzUgMWgtMy41QzUuNTYgMSA1IDEuNTYgNSAyLjI1VjNIM3YxMC43NWMwIC42OS41NiAxLjI1IDEuMjUgMS4yNWg3LjVjLjY5IDAgMS4yNS0uNTYgMS4yNS0xLjI1VjN6bS03LS43NUEuMjUuMjUgMCAwIDEgNi4yNSAyaDMuNWEuMjUuMjUgMCAwIDEgLjI1LjI1VjNINnYtLjc1em02IDExLjVhLjI1LjI1IDAgMCAxLS4yNS4yNWgtNy41YS4yNS4yNSAwIDAgMS0uMjUtLjI1VjRoOHY5Ljc1eiIvPjxwYXRoIGQ9Ik0xMy41IDRoLTExYS41LjUgMCAwIDEgMC0xaDExYS41LjUgMCAwIDEgMCAxeiIvPjwvZz48L3N2Zz4NCg==");
}

.arrow-up-icon, .arrow-down-icon, .delete-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 18px;
  height: 38px !important;
  width: 40px !important;
  padding: 10px;
  border: 1px solid var(--bs-btn-hover-border-color);
}

button {
  width: 100% !important;
}

/* CSS for the color picker component */
.input {
  background-color: #fefefe;
  background-clip: padding-box;
  border: var(--bs-border-width) solid #bbb !important;
  border-radius: 0 !important;
  box-shadow: var(--bs-box-shadow-inset);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input:focus-within {
  color: #333;
  background-color: #fefefe;
  border-color: #80bcf3;
  outline: 0;
  box-shadow: var(--bs-box-shadow-inset), 0 0 0 0.25rem rgba(0, 120, 230, 0.25);
}

.invalidInput {
  border: 2px solid red;
}

.invalidInput:focus {
  border: 2px solid red;
}

.delete-btn {
  margin-left: 25px;
}

.last-delete-btn {
  margin-left: 75px;
}

.moveDomainColor {
  width: 50%;
}

.to-top-section {
  padding-left: 0 !important;
}

.to-top-section button {
  width: 55%;
}

.to-down-section {
  padding-left: 0 !important;
}

.error-message-section {
  margin-top: -20px;
  color: red;
}

.error-message {
  color: red;
}

.color-picker {
  max-width: 126px;
}

.input-element {
  margin-right: 7px;
}

.domain-name {
  padding: 0.6rem 0.75rem;
}</style> <div><input type="hidden" name="data[tx_qc_be_domain_color]" id="field_tx_qc_be_domain_color" class="d-none"/> <div class="row"><div><span class="text-muted"> </span> <span class="text-muted"> </span></div> <div class="form-group t3js-formengine-validation-marker
                    t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4"><div class="formengine-field-item t3js-formengine-field-item "><div class="form-control-wrap"><div class="form-wizards-wrap"><div class="form-wizards-element"><input id="new-domain" autocomplete="off"/> <span class="error-message"> </span></div></div></div></div></div> <div class="form-group t3js-formengine-validation-marker
                    t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4"><div class="formengine-field-item t3js-formengine-field-item "><div class="form-control-wrap"><div class="btn-group"><button class="btn btn-default"> </button></div></div></div></div></div> <!></div>`,
		1
	);

	function DomainColorPickers($$anchor, $$props) {
		push($$props, false);

		const validInput = mutable_source();
		const colors = mutable_source();
		let domainColors = prop($$props, 'domainColors', 28, () => []);
		let conf = prop($$props, 'conf', 28, () => ({}));
		let domainName = mutable_source('');
		let domainColorsJson = mutable_source('{}');

		/**
		 * Check if the domain name is valid
		 * @param domain
		 */
		function isValidDomainName(domain) {
			try {
				new RegExp('/' + domain + '/');
			} catch(e) {
				return false;
			}

			return true;
		}

		/**
		 * Handle pressing "Enter" key
		 * @param event
		 */
		function handleKeyDown(event) {
			if (event.key === 'Enter') {
				addNewDomain(event);
			}
		}

		/**
		 * Add new domain color
		 * @param event
		 */
		function addNewDomain(event) {
			event.preventDefault();

			set(colors, [
				...get(colors),
				{ domain: get(domainName), color: new Color("#CCC") }
			]);

			domainColors([
				...domainColors(),
				{ domain: get(domainName), color: '#CCC', errorClass: '' }
			]);

			set(domainName, '');
		}

		/**
		 * Deleting a domain color
		 * @param event
		 * @param index
		 */
		function deleteDomainColor(event, index) {
			event.preventDefault();
			set(colors, get(colors).filter((_, i) => i !== index));
			domainColors(domainColors().filter((_, i) => i !== index));
		}

		onMount(() => {
			domainColors().forEach((obj, index) => {
				if (obj.color !== undefined) {
					let color = { 'domain': obj.domain, 'color': new Color(obj.color) };

					set(colors, [...get(colors), color]);
				}
			});
		});

		/**
		 * Moving domain color
		 * @param event
		 * @param action
		 * @param index
		 */
		function moveDomainColor(event, action, index) {
			event.preventDefault();

			let targetIndex = action === 'toDown' ? index + 1 : index - 1;
			let currentColor = get(colors)[index];
			let targetColor = get(colors)[targetIndex];

			mutate(colors, get(colors)[targetIndex] = currentColor);
			mutate(colors, get(colors)[index] = targetColor);
		}

		legacy_pre_effect(() => {}, () => {
			set(validInput, false);
		});

		legacy_pre_effect(() => (get(validInput), get(domainName)), () => {
			set(validInput, isValidDomainName(get(domainName)));
			set(validInput, get(validInput));
		});

		legacy_pre_effect(() => {}, () => {
			set(colors, []);
		});

		legacy_pre_effect(() => (get(colors), deep_read_state(domainColors())), () => {
			for (let i = 0; i < get(colors).length; i++) {
				domainColors(domainColors()[i].color = get(colors)[i].color.toHexString(), true);
				domainColors(domainColors()[i].domain = get(colors)[i].domain, true);
			}

			set(domainColorsJson, JSON.stringify(domainColors()));
		});

		legacy_pre_effect_reset();

		var $$exports = {
			get domainColors() {
				return domainColors();
			},

			set domainColors($$value) {
				domainColors($$value);
				flushSync();
			},

			get conf() {
				return conf();
			},

			set conf($$value) {
				conf($$value);
				flushSync();
			}
		};

		init();

		var fragment = comment();
		var node = first_child(fragment);

		{
			var consequent_5 = ($$anchor) => {
				var fragment_1 = root_1();
				var div = sibling(first_child(fragment_1), 2);
				var input = child(div);

				remove_input_defaults(input);

				var div_1 = sibling(input, 2);
				var div_2 = child(div_1);
				var span = child(div_2);
				var text = child(span, true);

				reset(span);

				var span_1 = sibling(span, 2);
				var text_1 = child(span_1, true);

				reset(span_1);
				reset(div_2);

				var div_3 = sibling(div_2, 2);
				var div_4 = child(div_3);
				var div_5 = child(div_4);
				var div_6 = child(div_5);
				var div_7 = child(div_6);
				var input_1 = child(div_7);

				remove_input_defaults(input_1);

				let classes;
				var span_2 = sibling(input_1, 2);
				var text_2 = child(span_2, true);

				reset(span_2);
				reset(div_7);
				reset(div_6);
				reset(div_5);
				reset(div_4);
				reset(div_3);

				var div_8 = sibling(div_3, 2);
				var div_9 = child(div_8);
				var div_10 = child(div_9);
				var div_11 = child(div_10);
				var button = child(div_11);
				var text_3 = child(button, true);

				reset(button);
				reset(div_11);
				reset(div_10);
				reset(div_9);
				reset(div_8);
				reset(div_1);

				var node_1 = sibling(div_1, 2);

				each(node_1, 1, () => (get(colors), untrack(() => Array.from(get(colors)))), index, ($$anchor, color, index) => {
					var div_12 = root_2();
					var div_13 = child(div_12);
					var div_14 = child(div_13);
					var div_15 = child(div_14);
					var div_16 = child(div_15);
					var div_17 = child(div_16);
					var input_2 = child(div_17);

					remove_input_defaults(input_2);

					let classes_1;

					reset(div_17);
					reset(div_16);
					reset(div_15);

					var div_18 = sibling(div_15, 2);
					var div_19 = child(div_18);
					var div_20 = child(div_19);
					var div_21 = child(div_20);
					var div_22 = child(div_21);
					var node_2 = child(div_22);

					ColorInput(node_2, {
						showAlphaSlider: true,
						get color() {
							return get(colors)[index].color;
						},

						set color($$value) {
							mutate(colors, get(colors)[index].color = $$value);
						},
						$$legacy: true
					});

					reset(div_22);
					reset(div_21);
					reset(div_20);
					reset(div_19);
					reset(div_18);

					var node_3 = sibling(div_18, 2);

					{
						var consequent_1 = ($$anchor) => {
							var div_23 = root_3();
							var button_1 = child(div_23);
							var node_4 = child(button_1);

							{
								var consequent = ($$anchor) => {
									var span_3 = root_4();
									var text_4 = child(span_3, true);

									reset(span_3);

									template_effect(() => set_text(text_4, (
										deep_read_state(conf()),
										untrack(() => conf().toTopBtnLabel)
									)));

									append($$anchor, span_3);
								};

								if_block(node_4, ($$render) => {
									if ((
										deep_read_state(conf()),
										untrack(() => conf().toTopBtnLabel !== undefined)
									)) $$render(consequent);
								});
							}

							reset(button_1);
							reset(div_23);
							event$1('click', button_1, () => moveDomainColor(event, 'toTop', index));
							append($$anchor, div_23);
						};

						if_block(node_3, ($$render) => {
							if (index > 0) $$render(consequent_1);
						});
					}

					var node_5 = sibling(node_3, 2);

					{
						var consequent_3 = ($$anchor) => {
							var div_24 = root_5();
							var button_2 = child(div_24);
							var node_6 = child(button_2);

							{
								var consequent_2 = ($$anchor) => {
									var span_4 = root_6();
									var text_5 = child(span_4, true);

									reset(span_4);

									template_effect(() => set_text(text_5, (
										deep_read_state(conf()),
										untrack(() => conf().toDownBtnLabel)
									)));

									append($$anchor, span_4);
								};

								if_block(node_6, ($$render) => {
									if ((
										deep_read_state(conf()),
										untrack(() => conf().toDownBtnLabel !== undefined)
									)) $$render(consequent_2);
								});
							}

							reset(button_2);
							reset(div_24);
							event$1('click', button_2, () => moveDomainColor(event, 'toDown', index));
							append($$anchor, div_24);
						};

						if_block(node_5, ($$render) => {
							if ((
								get(colors),
								untrack(() => get(colors).length > index + 1)
							)) $$render(consequent_3);
						});
					}

					var div_25 = sibling(node_5, 2);
					var button_3 = child(div_25);
					var node_7 = child(button_3);

					{
						var consequent_4 = ($$anchor) => {
							var span_5 = root_7();
							var text_6 = child(span_5, true);

							reset(span_5);

							template_effect(() => set_text(text_6, (
								deep_read_state(conf()),
								untrack(() => conf().DeleteBtnLabel)
							)));

							append($$anchor, span_5);
						};

						if_block(node_7, ($$render) => {
							if ((
								deep_read_state(conf()),
								untrack(() => conf().DeleteBtnLabel !== undefined)
							)) $$render(consequent_4);
						});
					}

					reset(button_3);
					reset(div_25);
					reset(div_14);
					reset(div_13);

					var div_26 = sibling(div_13, 2);
					var span_6 = child(div_26);
					var text_7 = child(span_6, true);

					reset(span_6);
					reset(div_26);
					reset(div_12);

					template_effect(
						($0, $1) => {
							classes_1 = set_class(input_2, 1, 'edit form-control mb-2 domain-name', null, classes_1, $0);

							set_class(div_25, 1, `p-2 ${(
							get(colors),
							untrack(() => index === 0 || get(colors).length === index + 1 ? 'last-delete-btn' : 'delete-btn')
						) ?? ''}`);

							set_text(text_7, $1);
						},
						[
							() => ({ invalidInput: !isValidDomainName(get(color).domain) }),
							() => (
								get(color),
								deep_read_state(conf()),
								untrack(() => isValidDomainName(get(color).domain) === true ? "" : conf().regexpError + conf().ignoredItem)
							)
						]
					);

					bind_value(input_2, () => get(color).domain, ($$value) => (
						get(color).domain = $$value,
						invalidate_inner_signals(() => (get(colors)))
					));

					event$1('click', button_3, () => deleteDomainColor(event, index));
					append($$anchor, div_12);
				});

				reset(div);

				template_effect(() => {
					set_text(text, (
						deep_read_state(conf()),
						untrack(() => conf().description)
					));

					set_text(text_1, (
						deep_read_state(conf()),
						untrack(() => conf().description_2)
					));

					set_attribute(input_1, 'placeholder', (
						deep_read_state(conf()),
						untrack(() => conf().placeholder)
					));

					classes = set_class(input_1, 1, 'new-domain form-control mb-2', null, classes, { invalidInput: !get(validInput) });

					set_text(text_2, (
						get(validInput),
						deep_read_state(conf()),
						untrack(() => get(validInput) === true ? "" : conf().regexpError)
					));

					button.disabled = (
						get(validInput),
						get(domainName),
						untrack(() => get(validInput) === false || get(domainName).length === 0)
					);

					set_text(text_3, (
						deep_read_state(conf()),
						untrack(() => conf().buttonLabel)
					));
				});

				bind_value(input, () => get(domainColorsJson), ($$value) => set(domainColorsJson, $$value));
				bind_value(input_1, () => get(domainName), ($$value) => set(domainName, $$value));
				event$1('keydown', input_1, handleKeyDown);
				event$1('click', button, addNewDomain);
				append($$anchor, fragment_1);
			};

			if_block(node, ($$render) => {
				if ((
					deep_read_state(conf()),
					untrack(() => conf().placeholder !== undefined)
				)) $$render(consequent_5);
			});
		}

		append($$anchor, fragment);

		return pop($$exports);
	}

	customElements.define('qc-domain-color-pickers', create_custom_element(
		DomainColorPickers,
		{
			domainColors: { attribute: 'domain-colors', type: 'Object' },
			conf: { attribute: 'data-conf', type: 'Object' }
		},
		[],
		[]
	));

})();
