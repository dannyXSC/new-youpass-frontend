// latex语法翻译
export default (s) => {
    s = s.replaceAll("\n", "\\\\")
    return s;
};