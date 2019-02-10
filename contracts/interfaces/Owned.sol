pragma solidity ^0.5.0;


interface Owned {

    event TransferredOwner(
        address indexed previousOwner,
        address indexed newOwner
    );


  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
    function renounceOwner() external;

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
    function transferOwner(address newOwner) external;


    function cancelOwner() external;

	function confirmOwner() external;

	/**
	* @return the address of the owner.
	*/

	function owner() external view returns(address);

	

	/**
	* @return true if `msg.sender` is the owner of the contract.
	*/
	function isOwner() external view returns(bool);
}