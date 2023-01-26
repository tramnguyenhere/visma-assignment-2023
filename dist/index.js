// Declare scheme
var Scheme;
(function (Scheme) {
    Scheme["VISMAIDENTITY"] = "visma-identity";
})(Scheme || (Scheme = {}));
// Declare all valid paths.
var Path;
(function (Path) {
    Path["LOGIN"] = "login";
    Path["CONFIRM"] = "confirm";
    Path["SIGN"] = "sign";
})(Path || (Path = {}));
// Declare all valid URI Parameters.
var URIParameter;
(function (URIParameter) {
    URIParameter["SOURCE"] = "source";
    URIParameter["PAYMENTNUMBER"] = "paymentnumber";
    URIParameter["DOCUMENTID"] = "documentid";
})(URIParameter || (URIParameter = {}));
// The class that handles the identification of requests.
class RequestIdentification {
    constructor(uri) {
        // Regex to catch the exact scheme "visma-identity" from the beginning to ":"
        this.scheme = uri.match(/^([^:]*)/)[0];
        // Regex to catch the path which locates between // and "?" (separator, indicating the end of path).
        // Since it returns an array, only catch the second option as the result.
        this.path = uri.match(/\/\/(.*?)\?/)[1];
        // Regex to catch the params which locates between "?" or "&" and the first "="
        this.params = uri.match(/(?<=[?&]).*?(?==)/g);
        // Regex to catch the params with their values which locates between "?" and "&" and from "&" to the end of uri
        this.paramsWithValues = uri.match(/(?<=\?)([^&]*)(?=&|$)|(?<=&)([^&]*)$/g);
    }
    /**
     * Check the validity of scheme whether it exactly matches "visma-identity".
     * @returns boolean.
     */
    isSchemeValid() {
        if (this.scheme === Scheme.VISMAIDENTITY) {
            return true;
        }
        return false;
    }
    /**
     * Check the validity of paths and review whether the parameters satisfy the requirements of a specific path.
     * @returns boolean.
     */
    areParamsValid() {
        // Invalid conditions when there are too many or lack of parameters; and when the first parameter is not source. 
        if (this.params.length > 2 || this.params.length === 0 || this.params[0] !== URIParameter.SOURCE) {
            return false;
            // Valid conditions for login path.
        }
        else if (this.path === Path.LOGIN && this.params.length === 1) {
            return true;
            // Valid conditions for confirm path.
        }
        else if (this.path === Path.CONFIRM && this.params[1] === URIParameter.PAYMENTNUMBER) {
            return true;
            // Valid conditions for sign path.
        }
        else if (this.path === Path.SIGN && this.params[1] === URIParameter.DOCUMENTID) {
            return true;
        }
        // Invalid conditions when there are errors in the paths or the parameters do not satisfy the path they follow.
        return false;
    }
    /**
     * Return the object that includes the validity of the request, the scheme, the path, and the parameters
     * @returns object.
     */
    isURIValid() {
        if (this.isSchemeValid() && this.areParamsValid()) {
            let paramObj = {};
            this.paramsWithValues.forEach(function (pair) {
                const [key, value] = pair.split('=');
                paramObj = Object.assign(paramObj, { [key]: value });
            });
            return {
                path: this.path,
                parameters: paramObj
            };
        }
        return {
            isURIValid: false,
            message: 'The request URI is not valid.'
        };
    }
}
const client = new RequestIdentification('visma-identity://sign?source=vismasign&documentid=105ab44');
console.log(client.isURIValid());
const a = ['source=vismasign', 'documentid=105ab44'];
const b = {
    source: 'vismasign',
    documentid: '105ab44'
};
export {};
//# sourceMappingURL=index.js.map