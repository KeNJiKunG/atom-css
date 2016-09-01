# mini-style
A bunch of shortened CSS class for element styling.

**THIS PROJECT IS PARTIALLY IMPLEMENTED. USE AT YOUR OWN RISK.**

**BE WARNED** : It may have some conflict naming in the future. Please consider create an issue if you find one.

# Shortcuts
| Shorthand | Properties | Example | Result |
| :-: | :-- | :---: | :-- |
| w# | width | w20 | width: 20px; |
| h# | height | h20 | height: 20px; |
| m | margin | m#<br>mt#<br>mb#<br>ml#<br>mr#<br>mx#<br>my# | margin: #px;<br>margin-top: #px;<br>margin-bottom: #px;<br>margin-left: #px;<br>margin-right: #px;<br>margin-left: #px; margin-right: #px;<br>margin-top: #px; margin-bottom: #px;<br> |
| p | padding | p#<br>pt#<br>pb#<br>pl#<br>pr#<br>px#<br>py# | padding: #px;<br>padding-top: #px;<br>padding-bottom: #px;<br>padding-left: #px;<br>padding-right: #px;<br>padding-left: #px; padding-right: #px;<br>padding-top: #px; padding-bottom: #px;<br> |
| b,i,u | font-style | b<br>i<br>u | font-width: bold;<br>font-style: italic;<br>text-decoration: underline  |
| f | float | fl<br>fr<br>fn<br> | float: left;<br>float: right;<br>float: none; |
| c | clear | cl<br>cr<br>cb<br>cn | clear: left;<br>clear: right;<br>clear: both;<br>clear: none; |
| cf | clear fix  | cf | .cf:after { context: ""; display: block; clear:both } |
| f | font-size | fss<br>fs<br>fb<br>fbb | font-size: smaller;<br>font-size: small<br>font-size: large;<br>font-size: larger; |
| d | display | dn<br>db<br>di<br>dib<br>dt<br>dit | display: none;<br>display: block;<br>display: inline;<br>display: inline-block;<br>display: table;<br>display: inline-table; |
| c,l,r | text-align | c<br>l<br>r | text-align: center;<br>text-align: left;<br>text-align: right; |
| v | vertical-align  | vt<br>vm<br>vb<br>vtt<br>vtb | vertical-align: top;<br>vertical-align: middle;<br>vertical-align: bottom;<br>vertical-align: text-top;<br>vertical-align: text-bottom; }  |
| v | visibility | vv<br>vh<br>vc | visibility: visible;<br>visibility: hidden;<br>visibility: collapse; |
| bs | box-sizing | bsb<br>bsc | box-sizing: border-box;<br>box-sizing: content-box; |
| p | position | ps<br>pa<br>pr<br>pf | position: static;<br>position: absolute;<br>position: relative;<br>position: fixed; |
| t,b,l,r| positioning  | t#<br>b#<br>l#<br>r#<br> |top: #px;<br>bottom: #px;<br>left: #px;<br>right: #px;|
| o | overflow | os<br>oh<br>ov<br>oa | overflow: scroll;<br>overflow: hidden;<br>overflow: visible;<br>overflow: auto; |
| ox | overflow-x | oxs<br>oxh<br>oxv<br>oxa | overflow-x: scroll;<br>overflow-x: hidden;<br>overflow-x: visible;<br>overflow-x: auto; |
| oy | overflow-y | oys<br>oyh<br>oyv<br>oya | overflow-y: scroll;<br>overflow-y: hidden;<br>overflow-y: visible;<br>overflow-y: auto; |
| ww | word-wrap | wwn<br>wwb | word-wrap: normal;<br>word-wrap: break-word; |
| wb | word-break | wbn<br>wbb<br>wbk | word-break: normal;<br>word-break: break-all;<br>word-break: keep-all |
| ls | letter-spacing | | |
| c | cursor | | |
| c | color | cRGB<br>cRRGGBB<br>cRRGGBBAA | color: #RRGGBB;<br>color: #RRGGBB;<br>color: rgba(RR, GG, BB, AA); |
| r | resize | rx<br>ry<br>rb<br>rn | resize: horizontal;<br>resize: vertical;<br>resize: both;<br>resize: none; |
| to | text-overflow | toc<br>toe | text-overflow: clip;<br>text-overflow: ellipsis; |
| tl | table-layout | tla<br>tlf | table-layout: auto;<br> table-layout:fixed |
| z | z-index | z1000 | z-index: 1000; |

# Modifiers
Change the condition

## Selector/Property modifers

| Modifier | Effect | Example | Result |
| :-: | :-- | --- | :-- |
| ! | !important | w20! | .w20! { width: 20px !important; } |
| ( | min | (w20 |  .(w20 { min-width: 20px; } |
| ) | max | w20) |  .w20) { max-width: 20px; } |
| : | media query | lg:w20 | @media lg(min-width: 1120px) { <br> .lg:w20 { max-width: 20px; }<br> } |
| . | if | c.w20 |  .c.w20 { width: 20px; } |
| @ | event selector | c@hover | .c@hover:hover { text-align: center; } |
| \| | Modernizr feature condition | w20\|canvas |  .canvas .w20 { width: 20px; } |
| ? | Developer helper | w?<br>w?1 | .w? { width: 20px !important; }<br>.w?1 { width: 20px !important; } |

## Unit Modifiers
| Modifier | Effect | Example | Result |
| :-: | :-- | --- | :-- |
| / | fraction | gd1/2 |  .gd1/2 { width: 50%; } |
| p | percent | w20p |  .w20p { width: 20%; } |
| . | literal fraction | ls1.3 | .ls1.3 { letter-spacing: 1.3px; } |
| a | auto | mxa | .mxa { margin-left: auto; margin-right: auto; } |

## Color digits
Use 3, 4, 6, 8 digit to specific the color code in hex based. and alpha channel in dex based.

Use h suffix to use hsl color space.

*Remark* : no 1, 2 digits because there are conflict with other class ( cb, cf )
| Digits | Example | Result |
| :-: | :-- | :-- |
| 3 | c999 | color: #999; |
| 3 | c999h | color: hsl( 9/16, 90%, 90% ); |
| 4 | c9999 | color: rgba( 144, 144, 144, 0.9 ); |
| 4 | c9999h | color: hlsa( 9/16, 90%, 90%, 0.9 ); |
| 6 | c999999 | color: #999999; |
| 6 | c999999h | color: hsl( 99/255, 99%, 99% ); |
| 8 | c99999999 | color: rgba( 144, 144, 144, 0.99 ); |
| 8 | c99999999h | color: hsla( 99/255, 99%, 99%, 0.99 ); |

# TO-DO
- Implement all the selector matching.
- Write gulp script to generate CSS class that found or included in script.
- Add warning when there are too many mini-style on one element.
- Add lab color space.