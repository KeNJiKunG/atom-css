/*!
 The MIT License (MIT)

 Copyright (c) 2016 KeNJiKunG
 */
/*
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

'use strict';
var fs = require( 'fs' );
var _ = require( 'lodash' );
var extend = require( 'extend' );

var classInfoExtractor =
	/^(((\w+\:)?(\()?([a-zA-Z]+)((-?\d*\/\d+)|(-?\d*(\.\d+)?(p|\%)?))?(\))?(\!)?((\|\w+)+)?)|(([a-zA-Z]+)\?(\d+)?))$/im,
	classExtractor = /\s+class=(['"])([\s\S]*?)\1/gim,
	mediaMapping = {
		xs: "xs",
		sm: "sm",
		md: "md",
		lg: "lg"
	};

function property( prop, size, important ) {
	this.prop = prop;
	this.size = size;
	this.important = important;
}

property.number = /^-?\d*(\.\d+)?$/;
property.percent = /^-?\d+(p|\%)$/;
property.fraction = /^(-?\d+)\/(\d+)$/;

property.prototype.toString = function () {
	var s = this.prop + ": " + this.sizeString();
	if( this.important )
		s += " !important";
	s += ";";
	return s;
};

property.prototype.sizeString = function () {
	if( property.percent.test( this.size ) )
		return this.size.replace( "p", "%" );
	else if( property.number.test( this.size ) )
		return "0" == this.size ? "0" : this.size + "px";
	else if( property.fraction.test( this.size ) ) {
		var s = property.fraction.exec( this.size ),
			t = parseInt( s[1], 10 ),
			i = parseInt( s[2], 10 );
		return(100 * t / i).toString() + "%";
	} else
		return this.size;
};

function getProperties( classInfo ) {
	var properties = [ ];
	if( _.startsWith( classInfo.base, "w" ) ) {
		var p = new property( "width", classInfo.size, classInfo.important );
		if( classInfo.min != null )
			p.prop = "min-width";
		if( classInfo.max != null )
			p.prop = "max-width";
		properties.push( p );
	} else if( _.startsWith( classInfo.base, "h" ) ) {
		var p = new property( "height", classInfo.size, classInfo.important );
		if( classInfo.min != null )
			p.prop = "min-height";
		if( classInfo.max != null )
			p.prop = "max-height";
		properties.push( p );
	} else if( "m" === classInfo.base ) {
		properties.push( new property( "margin", classInfo.size, classInfo.important ) );
	} else if( "mt" === classInfo.base ) {
		properties.push( new property( "margin-top", classInfo.size, classInfo.important ) );
	} else if( "mr" === classInfo.base ) {
		properties.push( new property( "margin-right", classInfo.size, classInfo.important ) );
	} else if( "mb" === classInfo.base ) {
		properties.push( new property( "margin-bottom", classInfo.size, classInfo.important ) );
	} else if( "ml" === classInfo.base ) {
		properties.push( new property( "margin-left", classInfo.size, classInfo.important ) );
	} else if( "mx" === classInfo.base ) {
		properties.push( new property( "margin-left", classInfo.size, classInfo.important ) );
		properties.push( new property( "margin-right", classInfo.size, classInfo.important ) );
	} else if( "my" === classInfo.base ) {
		properties.push( new property( "margin-top", classInfo.size, classInfo.important ) );
		properties.push( new property( "margin-bottom", classInfo.size, classInfo.important ) );
	} else if( "p" === classInfo.base ) {
		properties.push( new property( "padding", classInfo.size, classInfo.important ) );
	} else if( "pt" === classInfo.base ) {
		properties.push( new property( "padding-top", classInfo.size, classInfo.important ) );
	} else if( "pr" === classInfo.base ) {
		properties.push( new property( "padding-right", classInfo.size, classInfo.important ) );
	} else if( "pb" === classInfo.base ) {
		properties.push( new property( "padding-bottom", classInfo.size, classInfo.important ) );
	} else if( "pl" === classInfo.base ) {
		properties.push( new property( "padding-left", classInfo.size, classInfo.important ) );
	} else if( "px" === classInfo.base ) {
		properties.push( new property( "padding-left", classInfo.size, classInfo.important ) );
		properties.push( new property( "padding-right", classInfo.size, classInfo.important ) );
	} else if( "py" === classInfo.base ) {
		properties.push( new property( "padding-top", classInfo.size, classInfo.important ) );
		properties.push( new property( "padding-bottom", classInfo.size, classInfo.important ) );
	} else if( "b" === classInfo.base ) {
		properties.push( new property( "font-weight", "bold", classInfo.important ) );
	} else if( "i" === classInfo.base ) {
		properties.push( new property( "font-style", "italic", classInfo.important ) );
	} else if( "u" === classInfo.base ) {
		properties.push( new property( "text-decoration", "underline", classInfo.important ) );
	} else if( "ls" === classInfo.base ) {
		properties.push( new property( "letter-spacing", classInfo.size, classInfo.important ) );
	} else if( "l" === classInfo.base ) {
		properties.push( new property( "text-align", "left", classInfo.important ) );
	} else if( "c" === classInfo.base ) {
		properties.push( new property( "text-align", "center", classInfo.important ) );
	} else if( "r" === classInfo.base ) {
		properties.push( new property( "text-align", "right", classInfo.important ) );
	} else if( "fl" === classInfo.base ) {
		properties.push( new property( "float", "left", classInfo.important ) );
	} else if( "fr" === classInfo.base ) {
		properties.push( new property( "float", "right", classInfo.important ) );
	} else if( "fn" === classInfo.base ) {
		properties.push( new property( "float", "none", classInfo.important ) );
	} else if( "cl" === classInfo.base ) {
		properties.push( new property( "clear", "left", classInfo.important ) );
	} else if( "cr" === classInfo.base ) {
		properties.push( new property( "clear", "right", classInfo.important ) );
	} else if( "cb" === classInfo.base ) {
		properties.push( new property( "clear", "both", classInfo.important ) );
	} else if( "cn" === classInfo.base ) {
		properties.push( new property( "clear", "none", classInfo.important ) );
	} else if( "cf" === classInfo.base ) {
		properties.push( new property( "content", "''", classInfo.important ) );
		properties.push( new property( "display", "block", classInfo.important ) );
		properties.push( new property( "clear", "both", classInfo.important ) );
	} else if( "di" === classInfo.base ) {
		properties.push( new property( "display", "inline", classInfo.important ) );
	} else if( "db" === classInfo.base ) {
		properties.push( new property( "display", "block", classInfo.important ) );
	} else if( "dib" === classInfo.base ) {
		properties.push( new property( "display", "inline-block", classInfo.important ) );
	} else if( "dit" === classInfo.base ) {
		properties.push( new property( "display", "inline-table", classInfo.important ) );
	} else if( "dt" === classInfo.base ) {
		properties.push( new property( "display", "table", classInfo.important ) );
	} else if( "dn" === classInfo.base ) {
		properties.push( new property( "display", "none", classInfo.important ) );
	} else if( "vt" === classInfo.base ) {
		properties.push( new property( "vertical-align", "top", classInfo.important ) );
	} else if( "vm" === classInfo.base ) {
		properties.push( new property( "vertical-align", "middle", classInfo.important ) );
	} else if( "vb" === classInfo.base ) {
		properties.push( new property( "vertical-align", "bottom", classInfo.important ) );
	} else if( "vtt" === classInfo.base ) {
		properties.push( new property( "vertical-align", "text-top", classInfo.important ) );
	} else if( "vtb" === classInfo.base ) {
		properties.push( new property( "vertical-align", "text-bottom", classInfo.important ) );
	} else if( "gd" === classInfo.base ) {
		properties.push( new property( "width", classInfo.size, classInfo.important ) );
	} else if( "go" === classInfo.base ) {
		properties.push( new property( "margin-left", classInfo.size, classInfo.important ) );
	} else if( "gl" === classInfo.base ) {
		properties.push( new property( "left", classInfo.size, classInfo.important ) );
	} else if( "gr" === classInfo.base ) {
		properties.push( new property( "right", classInfo.size, classInfo.important ) );
	}
	return properties;
}

function ruleName( classInfo ) {
	if( classInfo.dev ) {
		classInfo.dev.replace( "?", "\\?" );
		return;
	}
	var rule = [ ];
	if( classInfo.condition != null ) {
		rule.push( classInfo.condition.replace( /\|/g, "." ) );
		rule.push( " " );
	}

	rule.push( "." );
	if( classInfo.media != null ) {
		rule.push( classInfo.media.replace( ":", "\\:" ) );
	}

	if( classInfo.min != null ) {
		rule.push( "\\(" );
	}

	rule.push( classInfo.base );
	if( classInfo.max != null ) {
		rule.push( "\\)" );
	}


	if( classInfo.size != null ) {
		rule.push( classInfo.size.replace( ".", "\\." )
			.replace( "/", "\\/" )
			.replace( "%", "\\%" ) );
	}

	if( classInfo.important ) {
		rule.push( "\\!" );
	}

	if( classInfo.condition != null ) {
		rule.push( classInfo.condition.replace( /\|/g, "\\|" ) );
	}

	if( classInfo.base == "cf" ) {
		rule.push( ":after" );
	}

	return rule.join( "" );
}

function n( classInfo ) {
	var n = [ ],
		properties = getProperties( classInfo );

	if( 0 == properties.length ) {
		n.push( "/* skipping " + classInfo.class + " */\n" );
	} else {
		var r = ruleName( classInfo );
		n.push( r );
		n.push( " { /* " + classInfo.class + " found in " + classInfo.file + " */ \n" );
		n.push( properties.join( "" ) );
		n.push( "}\n" );
	}
	return n.join( "" );
}

function gridDefault( m ) {
	return [
		"[class^='" + m + "gd'], [class*=' " + m + "gd'] { ",
		"float: left; ",
		"display: block; ",
		"box-sizing: border-box; ",
		"min-height: 1px;",
		"position: relative; ",
		"}"
	].join( '' );
}

function getClassInfo( classDefinition, filename ) {
	classDefinition = classDefinition.trim();
	if( "" === classDefinition )
		return null;

	var i = classInfoExtractor.exec( classDefinition );

	if( null === i ) {
		return null;
	}

	var info = {
		class: i[1],
		media: i[3],
		min: i[4],
		base: i[5] || i[16],
		size: i[6],
		percentage: i[8],
		max: i[11],
		important: i[12],
		condition: i[13],
		dev: i[15],
		position: i[17],
		file: filename
	};
	return info;
}

function atomCss( config ) {
	this.matches = [ ];
	this.config = config || { };
	this.config.mediaMapping = extend( { }, this.config.mediaMapping, mediaMapping );
	this.calls = [ ];
}

atomCss.prototype = {
	addFile: function ( filepath, cb ) {
		var atom = this;
		fs.readFile( filepath, function ( err, str ) {
			while ( true ) {
				var classes = classExtractor.exec( str );
				if( classes === null )
					break;

				classes[2].split( " " ).forEach( function ( cls ) {

					var t = getClassInfo( cls, filepath );
					if( t !== null )
						atom.matches.push( t );
				} );
			}
			if( cb !== undefined )
				cb();
		} );
	},
	getContents: function ( cb ) {
		if( cb === undefined )
			return this.toString();


		cb( this.toString() );
		return this;
	},
	toString: function () {
		var classes = _.uniqBy( this.matches, "class" ),
			groupedByMedia = _.groupBy( classes, "media" ),
			output = [ ];

		for( var media in groupedByMedia ) {
			if( media !== "undefined" ) {
				output.push( "@media " + this.config.mediaMapping[_.trimEnd( media, ":" )] + " { \n" );
			}

			groupedByMedia[media].forEach( function ( c ) {
				output.push( n( c ) );
			} );

			output.push( gridDefault( "undefined" === media ? "" : media ) );

			if( "undefined" !== media )
				output.push( "}\n" );
		}

		return output.join( "" );
	}
};

module.exports = atomCss;
