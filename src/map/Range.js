var Range = Set.proto({

	merge: function(array) {
		for (var i = array.length; i--; )
			if (!array[i].destroyed)
				this.add(array[i]);
	}
});
