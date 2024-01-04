export default function InputField({ label, err, ...rest }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                {...rest}
                className="form-control"
            />

        </div>
    )
}