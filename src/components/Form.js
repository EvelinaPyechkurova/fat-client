import ErrorMessage from "./ErrorMessage";

const Form = ({fields, handleSubmit, isLoading}) => {
    return( 
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field.name}>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    required={field.required}
                />
            </div>
            ))}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
            </button>       
        </form>
                     
    );
}
 
export default Form;