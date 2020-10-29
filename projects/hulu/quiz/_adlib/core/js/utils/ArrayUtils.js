/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	ArrayUtils

	Description:
		This object contains additional methods for manipulating arrays.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
ArrayUtils = (function() {

	/** Method: combine()
			A 'more friendly' concat function.

		arr1 				- first array
		arr2				- second array appended to the first  */
	function combine(arr1, arr2) {
		return arr1.concat(arr2);
	}

	/** Method: copy()
			Creates a unique duplicate of the given array.

		array 				- the array to duplicate  */
	function copy(array) {
		return array.slice();
	}

	/** Method: insertAt()
			Adds elements at a provided index. Returns a new array.

		array 				- the array to modify
		index				- the index to insert elements
		arguments			- the elements to insert */
	function insertAt(array, index) {
		var a = array.slice(0, index);
		var b = array.slice(index, array.length);
		var args = Array.prototype.slice.call(arguments);
		var values = args.slice(2, args.length);
		return a.concat(values).concat(b);
	}

	/** Method: removeAt()
			Removes an element at a provided index. Returns a new array.

		array 				- the array to modify
		index				- the index of the element to remove */
	function removeAt(array, index) {
		var a = copy(array);
		a.splice(index, 1);
		return a;
	}
	/** Method: remove()
				Removes all instances of an element from the given array. Returns a new array.

			array 				- the array to modify
			item				- the item to remove from the array */
	function remove(array, item) {
		var _returnArray = array.slice()
		while (_returnArray.indexOf(item) >= 0) _returnArray = removeAt(_returnArray, _returnArray.indexOf(item));
		return _returnArray;
	}

	/** Method: shuffle()
			Shuffles the array into a random order.

		array 				- the array to modify */
	function shuffle(array) {
		return array.sort(function() {
			return (Math.random() < .5) ? 1 : -1;
		});
	}

	/** Method: contains()
				Determines if a given array contains a given element. Returns a boolean.

			array 				- the array to check
			item				- the item to check for in the array */
	function contains(array, item) {
		return array.indexOf(item) >= 0;
	}

	/** --------------------------------------------------------------------------------- */
	// PUBLIC ACCESS
	return {
		combine: combine,
		copy: copy,
		insertAt: insertAt,
		shuffle: shuffle,
		removeAt: removeAt,
		remove: remove,
		contains: contains
	}
})();