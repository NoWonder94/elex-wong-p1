@foreach($withdrawplatform as $payment)
<option value="{{ $payment['payment_id'] }}">[{{ $payment['payment_id'] }}] {{ $payment['name'] }} {{ $payment['code'] }}</option>
@endforeach