/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	TextUtils

	Description:
		This object contains methods necessary for manipulating text.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var TextUtils = new function() {
	var self = this;
	
	/** Method: autosizeTF() 
			Fits a textfield's text to its bounds. Returns the result font size.
			
		target 				-	can be the whole textfield object, ( the object containing all three divs ), or specifically the textfield portion
								of the textfield object

		fontAdjustmentFactor 	-  	optional adjustment, decimal value that brings the top and bottom of the textfield in line with the top and bottom 
								of the text. To further clarify: Fonts in html behave weird. When creating a textfield with debugging turned on,
								you can see that the innermost container, the "textfield", (colored green when debugging is on), is often slightly 
								bigger than the text on the top and bottom, or one or the other, creating a margin of sorts.  This makes vertically 
								centering dynamically sized text, (ie after an autosize), seem off centered.  To fix this, you adjust the line height 
								until the green box aligns with the text on the top and bottom.  Usually its a couple pixels smaller than the font 
								size.  Then you can divide the line height by the font size to get your font adjustment factor. For example, if your 
								font size is 27 and your line height is 24, your fontAdjustment factor will be .88, (24/27 = .88).  Entering this 
								value as the second param of TextUtils.autosizeTF will preserve that font size/line height relationship as the font 
								is shrunk.

		Usage:
		(start code)
			TextUtils.autosizeTF( myTextfieldContainer );

			 -or -
			 
			TextUtils.autosizeTF( myTextfieldContainer.textfield );
		(end code)  */

	self.autosizeTF = function( target, fontAdjustmentFactor )
	{
		var elem = undefined;
		if( target.id ) elem = Markup.getElement( target );
		else elem = target.textfield;

		var elemParent = Markup.getParent( elem );
		fontAdjustmentFactor = fontAdjustmentFactor || 1;

		var currentFontSize = undefined;
		var lineHeightAdustment = undefined;

		var maxWidth = Styles.getWidth( elemParent );
		if( Styles.getWidth( elem ) > maxWidth )
		{
			while( Styles.getWidth( elem ) > maxWidth )
			{
		  		currentFontSize = currentFontSize === undefined ? Styles.getCss( elem, 'font-size' ) : currentFontSize - 1;

		  		Styles.setCss( elem, 'font-size', currentFontSize );

		  		lineHeightAdustment = currentFontSize * fontAdjustmentFactor;
		  		Styles.setCss( elem, 'line-height', lineHeightAdustment );
		  	}
		}

		var maxHeight = Styles.getHeight( elemParent );
		if( Styles.getHeight( elem ) > maxHeight )
		{
			while( Styles.getHeight( elem ) > maxHeight )
			{
		  		currentFontSize = currentFontSize === undefined ? Styles.getCss( elem, 'font-size' ) : currentFontSize - 1;

		  		Styles.setCss( elem, 'font-size', currentFontSize );

		  		lineHeightAdustment = currentFontSize * fontAdjustmentFactor;
		  		Styles.setCss( elem, 'line-height', lineHeightAdustment );
		  	}
		}

		if( Styles.getWidth( elem ) > maxWidth || Styles.getHeight( elem ) > maxHeight ) TextUtils.autosizeTF( elem );
		else return currentFontSize ? currentFontSize : Styles.getCss( elem, 'font-size' );
	}

	self.fitContainerToText = function( target, fitWidth, fitHeight )
	{
		var elem = Markup.getElement( target );

		if( fitWidth )
		{
			var textWidth = Styles.getWidth( target.textfield );
			Styles.setCss( target.parent, 'width', textWidth );
			// Styles.setCss( target.parent, 'left', parseInt( target.textfield.containerData.margin ) / 2 )

			// var newContainerWidth = parseInt( textWidth + parseInt( target.textfield.containerData.margin )  );
			var newContainerWidth = parseInt( textWidth );
			Styles.setCss( target.container, 'width', newContainerWidth );
		}
		
		if( fitHeight )
		{
			var textHeight = Styles.getHeight( target.textfield );
			Styles.setCss( target.parent, 'height', textHeight );
			Styles.setCss( target.container, 'height', textHeight );
		}
	}


	/** Method: matchTeamNameSize()

		This method is used for auto-sizing two team names to the maximum size where they are able to be the same size. 

		team1Element 		- first textfield, this is the ".textfield" component of the object that gets returned from <Markup>.addTextField() 
		team2Element 		- second textfield, this is the ".textfield" component of the object that gets returned from <Markup>.addTextField() */
	self.matchTeamNameSize = function( team1Element, team2Element ) {
		var team1FontSize = TextUtils.autosizeTF( team1Element );
		var team2FontSize = TextUtils.autosizeTF( team2Element );
		var smallestFontSize = team1FontSize > team2FontSize ? team2FontSize : team1FontSize;

		Styles.setCss( team1Element, { fontSize: smallestFontSize } );
		Align.moveX( Align.CENTER, team1Element );
		Styles.setCss( team2Element, { fontSize: smallestFontSize } );
		Align.moveX( Align.CENTER, team2Element );
	}




	/** Method: addText() 
			Writes text to a div.
			
		target 					-	div element in which to write text
		txt 					 	-  	text to be written */
	self.addText = function ( target, txt )
	{
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		elem.innerHTML = txt;
	}



	/** Method: hasText()
			Returns true or false depending on whether a div has anything inside of it.
			
		target 					-	div element */
	self.hasText = function( target )
	{
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		return elem.innerHTML.length > 0;
	}



	/** Method: numlines()
			Returns the number of lines that can fit in the element, given its size and line-height.
			
		target 					-	div element */
	self.numlines = function( target )
	{
		var elem = typeof target === 'string' ? Markup.getElement( target ) : target;
		return Styles.getCss( target, 'height') / Styles.getCss( target, 'line-height');
	}



	/** Method: addSpaces()
			Returns the specified number of '&nbsp;' strings.
			
		numberOfSpaces 			-	number of space entities to return */
	self.addSpaces = function( numberOfSpaces )
	{
		var spacingString = '';
		for( var i = 0; i < numberOfSpaces; i++ )
		{
			spacingString += '&nbsp;'
		}
		return spacingString;
	}





	/** Method: getSpecialCharacter()
			Returns entity equivilent for specified character.
			
		requestedCharacter 		-	character must match the 'label' key 
		isCapital 				-	flag to return the entity as capital */
	self.getSpecialCharacter = function( requestedCharacter, isCapital )
	{
		requestedCharacter = global.proxyStringToLowerCase.apply( requestedCharacter );
		for( var i = 0; i < self.specialChars.length; i++ )
		{
			var currentLabel = global.proxyStringToLowerCase.apply( self.specialChars[ i ].label );

			if( currentLabel === requestedCharacter ) return isCapital ? self.specialChars[ i ].upperCase : self.specialChars[ i ].lowerCase;
		}
		return false;
	}
	self.specialCharacters = [
		{ label: 'iexcl', upperCase: '&#161;', lowerCase: '&#161;' },
		{ label: 'trademark', upperCase: '&#153;', lowerCase: '&#153;' },
		{ label: 'copyright', upperCase: '&#169;', lowerCase: '&#169;' },
		{ label: 'registered', upperCase: '&#174;', lowerCase: '&#174;' },
		{ label: 'nTilde', upperCase: '&#209;', lowerCase: '&#241;' },
		{ label: 'aAccent', upperCase: '&#193;', lowerCase: '&#225;' },
		{ label: 'eAccent', upperCase: '&#201;', lowerCase: '&#233;' },
		{ label: 'iAccent', upperCase: '&#205;', lowerCase: '&#237;' },
		{ label: 'oAccent', upperCase: '&#211;', lowerCase: '&#243;' },
		{ label: 'uAccent', upperCase: '&#218;', lowerCase: '&#250;' }	
	];



	/** Method: trimStartAndEnd()
			Removes white space from the start and end of a string.
			
		target 					-	string to affect */
	self.trimStartAndEnd = function( target )
	{
		return target ? target.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' ) : '';
	}



	/** Method: removeSpaces()
			Removes all white space from the string.
			
		str 					-	string from which to remove spaces */
	self.removeSpaces = function( str )
	{
		return str.split(' ').join('');
	}



	/**	Method: pad()

		Pads a number with zeros up to the specified number of places.

		_target				- number to be padded
		_count				- expected result length of the numerical string */
	self.pad = function( _target, _count ) {
		var _sign = '';
		if( _target < 0 ) _sign = '-'
	    _target = _target.toString().replace( /\-/, '', _target );
	    while( _target.length < _count )
	        _target = '0' + _target;
	    return _sign + _target;
	}	
}
