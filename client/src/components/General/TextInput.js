function TextInput({ labelText, inputType, inputName, inputPlaceholder, changeEvent, inputValue }) {
  return (
    <div className="mb-4">
        <label className="block mb-4">{labelText}</label>
        <input 
            type={inputType} 
            name={inputName} 
            placeholder={inputPlaceholder} 
            className="bg-slate-50 w-full p-4 focus:outline-0 focus-within:bg-slate-100 rounded-lg"
            onChange={changeEvent}
            value={inputValue} 
        />
    </div>
  )
}

export default TextInput