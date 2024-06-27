import useDonation from "../../../custom hooks/useDonation";

const MyDonation = () => {
  const [donation] = useDonation();
//   console.log(donation);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <h1>S.L</h1>
            </th>
            <th>image</th>
            <th>pet name</th>
            <th>donated amount</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {donation?.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.petImg}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.petName}</td>
              <td>${item.donatedAmount}</td>
              <th>
                <button className="btn btn-ghost btn-xs">refund ?</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonation;
