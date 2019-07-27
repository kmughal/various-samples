module.exports = [{"name":"HelloWorld","description":"","code":"import React from \"react\";\nimport PropTypes from \"prop-types\";\n\n/** Simple Hello world component */\nconst inlineStyle = {\n\tbackground: \"#dfd7d9\",\n\t/* border: 4px dashed blue; */\n\tborder: \"1px solid #ccc\",\n\tpadding: \" 50px 50px\"\n};\n\nconst HelloWorld = ({ message }) => (\n\t<p style={inlineStyle}>{message}</p>\n);\n\nHelloWorld.propTypes = {\n\t/** \n    Message to display\n   */\n\tmessage: PropTypes.string\n};\n\nHelloWorld.defaultProps = {\n\tmessage: \"hello world\"\n};\n\nexport default HelloWorld;\n","examples":[{"name":"HelloWorldDateTime","code":"import React from \"react\"\nimport HelloWorld from \"ps-react/HelloWorld\"\n\nconst HelloWorldExample = () => <HelloWorld message={new Date().toString()}></HelloWorld>\n\nexport default HelloWorldExample\n","description":""},{"name":"HelloWorldExample","code":"import React from \"react\"\nimport HelloWorld from \"ps-react/HelloWorld\"\n\nconst HelloWorldExample = () => <HelloWorld message={\"Hello world from khurram\"}></HelloWorld>\n\nexport default HelloWorldExample\n","description":""}],"props":{"message":{"type":{"name":"string"},"required":false,"description":"Message to display","defaultValue":{"value":"\"hello world\"","computed":false}}}}]