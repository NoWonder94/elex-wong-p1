import jQuery from 'jquery';

export class Toast {
	static error(msg) {
		jQuery('#alerts-box').html(`<div class="alert alert-danger alert-dismissible" role="alert">
  		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  			<span aria-hidden="true">&times;</span>
  		</button>
  		<span class="message">${msg}</span>
  	</div>`);
	}
}