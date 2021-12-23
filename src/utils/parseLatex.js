// latex语法翻译
export default (s) => {
    if(typeof(s)!='string'){
        s = ''
    }
    s = s.replaceAll("\n", "\\\\")
    return s;
};