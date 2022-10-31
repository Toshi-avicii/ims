
function ProfileStats(props) {
  return (
    <div className="p-1 ml-4 text-2xl w-25"> 
        <h4 className="text-center">
            {props.stat}
            <span className="text-xs block text-gray-700">{props.name}</span>
        </h4>
    </div>
  )
}

export default ProfileStats