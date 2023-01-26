import { uri } from "./requestURI.js";
import { Path, Scheme, URIParameter } from "./types.js";

// The class that handles the identification of requests.
class RequestIdentification {

    // Field type declaration.
    scheme: string;
    path: string;
    params: string[];
    paramsWithValues: string[];

    constructor(uri: string) {

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
    isSchemeValid(): boolean {
        if (this.scheme === Scheme.VISMAIDENTITY) {
            return true
        }
        return false
    }

    /**
     * Check the validity of paths and review whether the parameters satisfy the requirements of a specific path.
     * @returns boolean.
     */
    areParamsValid(): boolean {

        // Invalid conditions when there are too many or lack of parameters; and when the first parameter is not source. 
        if (this.params.length > 2 || this.params.length === 0 || this.params[0] !== URIParameter.SOURCE) {
            return false

        // Valid conditions for login path.
        } else if (this.path === Path.LOGIN && this.params.length === 1) {
            return true

        // Valid conditions for confirm path.
        } else if (this.path === Path.CONFIRM && this.params[1] === URIParameter.PAYMENTNUMBER) {
            return true
        
        // Valid conditions for sign path.
        } else if (this.path === Path.SIGN && this.params[1] === URIParameter.DOCUMENTID) {
            return true
        }

        // Invalid conditions when there are errors in the paths or the parameters do not satisfy the path they follow.
        return false
    }

    /**
     * Return the object that includes the validity of the request, the scheme, the path, and the parameters.
     * @returns object.
     */
    isURIValid(): object  {

        // If the request URI is valid.
        if (this.isSchemeValid() && this.areParamsValid()) {

            let paramObj = {};

            /*
                1. Divide each element in paramsWithValues into an ordered list of substring.
                2. In each element, assign the first substring as key and the latter as value.
                3. Assign the object to the variable paramObj.
            */
            this.paramsWithValues.forEach((pair) => {
                const [key, value] = pair.split('=');
                paramObj = Object.assign(paramObj, {[key]: value});
            });

            return {
                path: this.path,
                parameters: paramObj
            }
        }

        return {
            isURIValid: false,
            message: 'The request URI is not valid to further identify.'
        }
    }
    
}

// Replace the parameter URI below with your own request to identify.
const client = new RequestIdentification(uri)

console.log(client.isURIValid());
