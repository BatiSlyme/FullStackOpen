const PersonForm = ({ submit, newName, handleNameChange, phoneNumber, handlePhoneNumberChange }) => {
    return (<form onSubmit={submit}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
            <button type="submit" >add</button>
        </div>
    </form>);
}

export default PersonForm;