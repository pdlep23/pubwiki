jQuery(function($) {
    'use strict';
    mobileDropdown();

    function mobileDropdown() {
        if ($('.tr-menu').length) {
            $('.tr-menu .tr-dropdown').on("append", function() {
                return '<i class="fa fa-angle-down icon" aria-hidden="true"></i>';
            });
            $('.tr-menu .tr-dropdown .icon').on('click', function() {
                $(this).parent('li').children('ul').slideToggle();
            });
        }
    }
    $(document).on('click', '.tr-change a', function(ev) {
        if ("#" === $(this).attr('data-target')) {
            ev.preventDefault();
            var parent = $(this).parents('.tr-change-dropdown');
            parent.find('.change-text').html($(this).html());
        }
    });

    $(document).on("change", "input[type='checkbox']", function() {
        if ($(this).is(':checked')) {
            $(this).parent("label").addClass("checked");
        } else {
            $(this).parent("label").removeClass("checked");
        }
    });

    $(document).on('click', ".remove-icon", function() {
        $(this).parents('.remove-item').fadeOut();
    });

    $(document).ready(function() {
        var regex = /^(.*)(\d)+$/i;
        var cloneitem = $("#addhistory").length;
        $('#clone').click(function() {
            $('#addhistory').clone().appendTo('.additem-work').attr("id", "#addhistory" + cloneitem).find("*").each(function() {
                var id = this.id || "";
                var match = id.match(regex) || [];
                if (match.length == 3) {
                    this.id = match[1] + (cloneitem);
                };
            });
            cloneitem++;
        });
        var cloneitem2 = $("#add-edu").length;
        $('#edu-clone').click(function() {
            $('#add-edu').clone().appendTo('.additem-edu').attr("id", "#add-edu" + cloneitem2).find("*").each(function() {
                var id = this.id || "";
                var match = id.match(regex) || [];
                if (match.length == 3) {
                    this.id = match[1] + (cloneitem2);
                };
            });
            cloneitem2++;
        });
        var cloneitem3 = $("#achievement").length;
        $('#achiev-clone').click(function() {
            $('#achievement').clone().appendTo('.additem-achiev').attr("id", "#achievement" + cloneitem3).find("*").each(function() {
                var id = this.id || "";
                var match = id.match(regex) || [];
                if (match.length == 3) {
                    this.id = match[1] + (cloneitem3);
                };
            });
            cloneitem3++;
        });

        $(document).on('click', '.remove', function() {
            $(this).parents(".additem").remove();
        });
    });
});